import { Piece, type Color } from "./piece";
import { LocationMap } from "@/lib/location";

class King extends Piece {
  constructor(x: number, y: number, color: Color) {
    super("k", x, y, 0, color);
  }

  getLegalMoves(locations: LocationMap) {
    const legalMoves: [number, number][] = [];

    const backwardsX = this.x - 1;
    const forwardX = this.x + 1;

    if (backwardsX >= 0) {
      const piece = locations.getPiece(backwardsX, this.y);
      if (piece?.color !== this.color) {
        legalMoves.push([backwardsX, this.y]);
      }

      const pieceLeft = locations.getPiece(backwardsX, this.y - 1);
      if (pieceLeft?.color !== this.color) {
        legalMoves.push([backwardsX, this.y - 1]);
      }

      const pieceRight = locations.getPiece(backwardsX, this.y + 1);
      if (pieceRight?.color !== this.color) {
        legalMoves.push([backwardsX, this.y + 1]);
      }
    }

    if (forwardX < 8) {
      const piece = locations.getPiece(forwardX, this.y);
      if (piece?.color !== this.color) {
        legalMoves.push([forwardX, this.y]);
      }

      const pieceLeft = locations.getPiece(forwardX, this.y - 1);
      if (pieceLeft?.color !== this.color) {
        legalMoves.push([forwardX, this.y - 1]);
      }

      const pieceRight = locations.getPiece(forwardX, this.y + 1);
      if (pieceRight?.color !== this.color) {
        legalMoves.push([forwardX, this.y + 1]);
      }
    }

    const pieceLeft = locations.getPiece(this.x, this.y - 1);
    if (pieceLeft?.color !== this.color) {
      legalMoves.push([this.x, this.y - 1]);
    }

    const pieceRight = locations.getPiece(this.x, this.y + 1);
    if (pieceRight?.color !== this.color) {
      legalMoves.push([this.x, this.y + 1]);
    }

    return legalMoves;
  }
}

export default King;
