import { Piece, type Color } from "./piece";
import { LocationMap } from "@/lib/location";

export class Knight extends Piece {
  constructor(x: number, y: number, color: Color) {
    super("n", x, y, 3, color);
  }

  getLegalMoves(locations: LocationMap) {
    const legalMoves: [number, number][] = [];

    const backwardsX = this.x - 2;
    const forwardX = this.x + 2;

    const backwardsY = this.y - 2;
    const forwardY = this.y + 2;

    if (backwardsX >= 0) {
      if (this.y !== 0) {
        let piece = locations.getPiece(backwardsX, this.y - 1);
        if (this.isOpColor(piece)) legalMoves.push([backwardsX, this.y - 1]);
        if (this.y !== 7) {
          piece = locations.getPiece(backwardsX, this.y + 1);
          if (this.isOpColor(piece)) legalMoves.push([backwardsX, this.y + 1]);
        }
      } else {
        const piece = locations.getPiece(backwardsX, 1);
        if (this.isOpColor(piece)) legalMoves.push([backwardsX, 1]);
      }
    }

    if (forwardX < 8) {
      if (this.y !== 0) {
        let piece = locations.getPiece(forwardX, this.y - 1);
        if (this.isOpColor(piece)) legalMoves.push([forwardX, this.y - 1]);
        if (this.y !== 7) {
          piece = locations.getPiece(forwardX, this.y + 1);
          if (this.isOpColor(piece)) legalMoves.push([forwardX, this.y + 1]);
        }
      } else {
        const piece = locations.getPiece(forwardX, 1);
        if (this.isOpColor(piece)) legalMoves.push([forwardX, 1]);
      }
    }

    if (backwardsY >= 0) {
      if (this.x !== 0) {
        let piece = locations.getPiece(this.x - 1, backwardsY);
        if (this.isOpColor(piece)) legalMoves.push([this.x - 1, backwardsY]);
        if (this.x !== 7) {
          piece = locations.getPiece(this.x + 1, backwardsY);
          if (this.isOpColor(piece)) legalMoves.push([this.x + 1, backwardsY]);
        }
      } else {
        const piece = locations.getPiece(1, backwardsY);
        if (this.isOpColor(piece)) legalMoves.push([1, backwardsY]);
      }
    }

    if (forwardY >= 0) {
      if (this.x !== 0) {
        let piece = locations.getPiece(this.x - 1, forwardY);
        if (this.isOpColor(piece)) legalMoves.push([this.x - 1, forwardY]);
        if (this.x !== 7) {
          piece = locations.getPiece(this.x + 1, forwardY);
          if (this.isOpColor(piece)) legalMoves.push([this.x + 1, forwardY]);
        }
      } else {
        const piece = locations.getPiece(1, forwardY);
        if (this.isOpColor(piece)) legalMoves.push([1, forwardY]);
      }
    }

    return legalMoves;
  }

  private isOpColor(piece: Piece | undefined | null) {
    return piece?.color !== this.color;
  }
}

export default Knight;
