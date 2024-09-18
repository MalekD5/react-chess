import { Piece, type Color } from "./piece";
import { LocationMap } from "@/lib/location";

class Pawn extends Piece {
  constructor(x: number, y: number, color: Color) {
    super("p", x, y, 1, color);
  }
  getLegalMoves(locations: LocationMap) {
    console.log(this.x, this.y);
    const legal: [number, number][] = [];
    const isW = this.color === "w";

    const upOneX = isW ? this.x + 1 : this.x - 1;
    const upTwoX = isW ? this.x + 2 : this.x - 2;

    // there is a blocking piece
    if (!locations.hasPiece(upOneX, this.y)) {
      legal.push([upOneX, this.y]);

      const isStartingPos = isW ? this.x === 1 : this.x === 6;

      if (isStartingPos && !locations.hasPiece(upTwoX, this.y)) {
        legal.push([upTwoX, this.y]);
      }
    }

    // Checking for takes
    const checkLeftY = isW ? this.y !== 7 : this.y !== 0;
    const checkRightY = isW ? this.y !== 0 : this.y !== 7;

    const leftY = isW ? this.y - 1 : this.y + 1;
    const rightY = isW ? this.y + 1 : this.y - 1;

    // left piece
    if (checkLeftY && locations.getPiece(upOneX, leftY)) {
      legal.push([upOneX, leftY]);
    }

    // right piece
    if (checkRightY && locations.getPiece(upOneX, rightY)) {
      legal.push([upOneX, rightY]);
    }

    return legal;
  }
}

export default Pawn;
