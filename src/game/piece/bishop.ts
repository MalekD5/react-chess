import { Piece, type Color } from "./piece";
import { LocationMap } from "@/lib/location";

class Bishop extends Piece {
  constructor(x: number, y: number, color: Color) {
    super("b", x, y, 3, color);
  }

  getLegalMoves(locations: LocationMap) {
    const legalMoves: [number, number][] = [];
    let loopX, loopY;

    for (
      loopY = this.y + 1, loopX = this.x + 1;
      loopY < 8 && loopX < 8;
      loopY = loopY + 1, loopX = loopX + 1
    ) {
      const piece = locations.getPiece(loopX, loopY);
      if (piece != null) {
        if (piece.color !== this.color) {
          legalMoves.push([loopX, loopY]);
        }
        break;
      }
      legalMoves.push([loopX, loopY]);
    }

    for (
      loopY = this.y - 1, loopX = this.x + 1;
      loopY >= 0 && loopX < 8;
      loopY--, loopX++
    ) {
      const piece = locations.getPiece(loopX, loopY);
      if (piece != null) {
        if (piece.color !== this.color) {
          legalMoves.push([loopX, loopY]);
        }
        break;
      }
      legalMoves.push([loopX, loopY]);
    }

    for (
      loopX = this.x - 1, loopY = this.y + 1;
      loopX >= 0 && loopY < 8;
      loopX--, loopY++
    ) {
      const piece = locations.getPiece(loopX, loopY);
      if (piece != null) {
        if (piece.color !== this.color) {
          legalMoves.push([loopX, loopY]);
        }
        break;
      }
      legalMoves.push([loopX, loopY]);
    }

    for (
      loopX = this.x - 1, loopY = this.y - 1;
      loopX >= 0 && loopY >= 0;
      loopX--, loopY--
    ) {
      const piece = locations.getPiece(loopX, loopY);
      if (piece != null) {
        if (piece.color !== this.color) {
          legalMoves.push([loopX, loopY]);
        }
        break;
      }
      legalMoves.push([loopX, loopY]);
    }

    return legalMoves;
  }
}

export default Bishop;
