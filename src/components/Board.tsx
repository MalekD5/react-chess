import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { tv } from "tailwind-variants";
import { CSS } from "@dnd-kit/utilities";
import { useGame } from "@/game/store";
import { getKey } from "@/lib/location";

const sqaureTV = tv({
  base: "w-16 h-16",
  variants: {
    color: {
      white: "bg-green-100",
      black: "bg-green-800",
    },
  },
});

type BaseType = {
  x: number;
  y: number;
};

function Piece({ x, y }: BaseType) {
  const side = useGame((state) => state.side);
  const piece = useGame((state) => state.locations.getPiece(x, y));

  const { setNodeRef, transform, attributes, listeners } = useDraggable({
    id: `piece-${x}-${y}`,
    data: {
      x,
      y,
    },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="text-3xl text-red-700"
      style={style}
      {...listeners}
      {...attributes}
    >
      {piece && (
        <img
          width={60}
          height={60}
          src={`./assets/${piece.identifer}-${piece.color}.png`}
          alt="chess piece"
        />
      )}
    </div>
  );
}

function Square({ x, y, children }: BaseType & React.PropsWithChildren) {
  const locations = useGame((state) => state.locations);
  const currentPiece = useGame((state) => state.currentPiece);
  const moves = currentPiece?.getLegalMoves(locations);

  const isValidMove = moves?.find((move) => move[0] === x && move[1] === y);

  const { setNodeRef } = useDroppable({
    id: getKey(x, y),
    data: {
      x,
      y,
    },
    disabled: !isValidMove,
  });

  const style = isValidMove
    ? {
        backgroundColor: "red",
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      className={sqaureTV({ color: (x + y) % 2 ? "black" : "white" })}
      style={style}
    >
      {children}
    </div>
  );
}

export default function Board() {
  const pov = useGame((state) => state.side);
  const locations = useGame((state) => state.locations);
  const updateCurrentPiece = useGame((state) => state.setCurrentPiece);
  const updateMove = useGame((state) => state.updateMove);

  const isW = pov === "w";
  const squares = [];

  for (let i = 63; i >= 0; i--) {
    const y = isW ? 7 - (i % 8) : i % 8;
    const x = Math.floor(i / 8);
    squares.push(
      <Square key={i} x={x} y={y}>
        <Piece x={x} y={y} />
      </Square>,
    );
  }

  function onDragStart(event: DragStartEvent) {
    if (!event.active || !event.active.data.current) return;
    const { current } = event.active.data;

    const piece = locations.getPiece(current.x, current.y);
    if (!piece) return;
    updateCurrentPiece(piece);
  }

  function onDragEnd(event: DragEndEvent) {
    updateCurrentPiece(null);

    const { over, active } = event;

    // Illegal Move
    if (!over) {
      return;
    }

    updateMove(
      locations.getPiece(active.data.current!.x, active.data.current!.y)!,
      over.data.current!.x,
      over.data.current!.y,
    );
  }

  function onDragCancel() {
    console.log("cancel");
    updateCurrentPiece(null);
  }

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className="grid grid-cols-8 grid-rows-8 select-none">{squares}</div>
    </DndContext>
  );
}
