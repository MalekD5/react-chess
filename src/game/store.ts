import { create } from "zustand";
import { getKey, LocationMap } from "../lib/location";
import type { Piece } from "./piece/piece";
import Queen from "./piece/queen";
import King from "./piece/king";
import Bishop from "./piece/bishop";
import Knight from "./piece/knight";
import Rook from "./piece/rook";
import Pawn from "./piece/pawn";

type Store = {
  locations: LocationMap;
  timerId: number;
  side: "b" | "w";
  currentPiece: Piece | null;
  setCurrentPiece: (Piece: Piece | null) => void;
  updateMove: (piece: Piece, x: number, y: number) => void;
};

export const useGame = create<Store>()((set) => ({
  locations: initDefaultLocations(),
  timerId: -1,
  side: "w",
  currentPiece: null,
  setCurrentPiece: (piece: Piece | null) =>
    set(() => ({
      currentPiece: piece,
    })),
  updateMove(piece, x, y) {
    set((state) => {
      const locations = state.locations;
      const mapPiece = locations.getPiece(piece.x, piece.y);
      if (!mapPiece) {
        return { locations };
      }

      locations.delete(getKey(piece.x, piece.y));
      piece.x = x;
      piece.y = y;
      locations.putFromPiece(piece);
      return { locations };
    });
  },
}));

function initDefaultLocations(): LocationMap {
  const locations = new LocationMap();

  // create a correct starting position
  for (let i = 0; i < 8; i++) {
    locations.putFromPiece(new Pawn(1, i, "w"));
    locations.putFromPiece(new Pawn(6, i, "b"));
  }

  locations.putFromPiece(new Rook(0, 0, "w"));
  locations.putFromPiece(new Rook(0, 7, "w"));

  locations.putFromPiece(new Rook(7, 0, "b"));
  locations.putFromPiece(new Rook(7, 7, "b"));

  locations.putFromPiece(new Knight(0, 1, "w"));
  locations.putFromPiece(new Knight(0, 6, "w"));

  locations.putFromPiece(new Knight(7, 1, "b"));
  locations.putFromPiece(new Knight(7, 6, "b"));

  locations.putFromPiece(new Bishop(0, 2, "w"));
  locations.putFromPiece(new Bishop(0, 5, "w"));

  locations.putFromPiece(new Bishop(7, 2, "b"));
  locations.putFromPiece(new Bishop(7, 5, "b"));

  locations.putFromPiece(new King(0, 4, "w"));
  locations.putFromPiece(new King(7, 4, "b"));

  locations.putFromPiece(new Queen(0, 3, "w"));
  locations.putFromPiece(new Queen(7, 3, "b"));

  return locations;
}
