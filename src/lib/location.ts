import { Piece } from "../game/piece/piece";

const MAX_16BIT_SIGNED = 32767;

export function getKey(x: number, y: number): number {
  // We don't expect negative x and y
  if (x > MAX_16BIT_SIGNED || y > MAX_16BIT_SIGNED || x < 0 || y < 0) {
    return -1;
  }

  x += MAX_16BIT_SIGNED;
  y += MAX_16BIT_SIGNED;
  return (x << 16) | y;
}

export function decodeXY(key: number) {
  return [(key >> 16) - MAX_16BIT_SIGNED, (key & 0xffff) - MAX_16BIT_SIGNED];
}

export class LocationMap extends Map<number, Piece> {
  constructor() {
    super();
  }

  putFromPiece(Piece: Piece) {
    this.set(getKey(Piece.x, Piece.y), Piece);
  }

  put(x: number, y: number, piece: Piece) {
    this.set(getKey(x, y), piece);
  }

  getPiece(x: number, y: number): Piece | undefined {
    return this.get(getKey(x, y));
  }

  hasPiece(x: number, y: number): boolean {
    return !!this.getPiece(x, y);
  }
}
