import type { LocationMap } from "@/lib/location";
export type Color = "w" | "b";

export abstract class Piece {
  readonly identifer: string;
  x: number;
  y: number;
  readonly color: Color;
  readonly value: number;

  constructor(
    identifer: string,
    x: number,
    y: number,
    value: number,
    color: Color,
  ) {
    this.identifer = identifer;
    this.x = x;
    this.y = y;
    this.value = value;
    this.color = color;
  }

  abstract getLegalMoves(locations: LocationMap): [number, number][];
}
