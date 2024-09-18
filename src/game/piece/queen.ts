import { Piece, type Color } from "./piece";
import { LocationMap } from "@/lib/location";

class Queen extends Piece {
  constructor(x: number, y: number, color: Color) {
    super("q", x, y, 8, color);
  }
  getLegalMoves(locations: LocationMap) {
    const legalMoves: [number, number][] = [];
    if (this.y != 0) {
      for (let i = this.y - 1; i >= 0; i--) {
        const piece = locations.getPiece(this.x, i);
        if (piece) {
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
        if (piece) {
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
        if (piece) {
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
        if (piece) {
          if (piece.color !== this.color) {
            legalMoves.push([i, this.y]);
          }
          break;
        }
        legalMoves.push([i, this.y]);
      }
    }

    for (let y = this.y + 1, x = this.x + 1; y < 8 && x < 8; y++, x++) {
      const piece = locations.getPiece(x, y);
      if (piece) {
        if (piece.color !== this.color) {
          legalMoves.push([x, y]);
        }
        break;
      }
      legalMoves.push([x, y]);
    }

    for (let y = this.y - 1, x = this.x + 1; y >= 0 && x < 8; y--, x++) {
      const piece = locations.getPiece(x, y);
      if (piece) {
        if (piece.color !== this.color) {
          legalMoves.push([x, y]);
        }
        break;
      }
      legalMoves.push([x, y]);
    }

    for (let x = this.x - 1, y = this.y + 1; x >= 0 && y < 8; x--, y++) {
      const piece = locations.getPiece(x, y);
      if (piece) {
        if (piece.color !== this.color) {
          legalMoves.push([x, y]);
        }
        break;
      }
      legalMoves.push([x, y]);
    }

    for (let x = this.x - 1, y = this.y - 1; x >= 0 && y >= 0; x--, y--) {
      const piece = locations.getPiece(x, y);
      if (piece) {
        if (piece.color !== this.color) {
          legalMoves.push([x, y]);
        }
        break;
      }
      legalMoves.push([x, y]);
    }

    return legalMoves;
  }
}

export default Queen;
