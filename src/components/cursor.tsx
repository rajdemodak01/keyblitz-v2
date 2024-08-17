import { useAppSelector } from "@/lib/hooks";
import React from "react";

interface Props {
  cursorRef: React.RefObject<HTMLDivElement>;
  cursorPosition: { left: number; top: number };
}

const Cursor = ({ cursorRef, cursorPosition }: Props) => {
  const { width: letterWidth, height: letterHeight } = useAppSelector(
    (state) => state.typingParagraphProp
  );

  return (
    <div
      ref={cursorRef}
      className=" absolute bg-foreground rounded-lg animate-pulse z-10 "
      style={{
        width: letterWidth / 4,
        left: -letterWidth / 4,
        height: letterHeight,
        transform: `translate(${cursorPosition.left}px, ${cursorPosition.top}px)`,
        transition: "all 0.05s ease-in-out",
      }}
    />
  );
};

export default Cursor;
