import { Piece, type Color } from "./piece";
import { LocationMap } from "@/lib/location";

class Rook extends Piece {
  constructor(x: number, y: number, color: Color) {
    super("r", x, y, 5, color);
  }

  getLegalMoves(locations: LocationMap) {
    const legalMoves: [number, number][] = [];
    if (this.y != 0) {
      for (let i = this.y - 1; i >= 0; i--) {
        const piece = locations.getPiece(this.x, i);
        if (piece != null) {
          if (piece.color !== this.color) {
            legalMoves.push([this.x, i]);
          }
          break;
        }
        legalMoves.push([this.x, i]);
      }
    }

    if (this.y !== 7) {
      for (let i = this.y + 1; i < 8; i++) {
        const piece = locations.getPiece(this.x, i);
        if (piece != null) {
          if (piece.color !== this.color) {
            legalMoves.push([this.x, i]);
          }
          break;
        }
        legalMoves.push([this.x, i]);
      }
    }

    if (this.x !== 0) {
      for (let i = this.x - 1; i >= 0; i--) {
        const piece = locations.getPiece(i, this.y);
        if (piece != null) {
          if (piece.color !== this.color) {
            legalMoves.push([i, this.y]);
          }
          break;
        }
        legalMoves.push([i, this.y]);
      }
    }

    if (this.x !== 7) {
      for (let i = this.x + 1; i < 8; i++) {
        const piece = locations.getPiece(i, this.y);
        if (piece != null) {
          if (piece.color !== this.color) {
            legalMoves.push([i, this.y]);
          }
          break;
        }
        legalMoves.push([i, this.y]);
      }
    }

    return legalMoves;
  }
}

export default Rook;
