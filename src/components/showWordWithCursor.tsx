import React, { useEffect, useRef, useState } from "react";
import ShowLetterWithCursor from "./showLetterWithCursor";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";

interface Props {
  wordProp: wordProp;
  index: number;
  wordIndex: number;
  cursorRef: React.RefObject<HTMLDivElement>;
  currentWordRef: React.RefObject<HTMLDivElement>;
  letterIndex: number;
  isCurrent: boolean;
  showCursor: boolean;
}

const ShowWordWithCursor = ({
  wordProp,
  index,
  wordIndex,
  cursorRef,
  currentWordRef,
  letterIndex,
  isCurrent,
  showCursor,
}: Props) => {
  const [leftPos, setLeftPos] = useState(0); // this is the normal curosor position
  const [ghostsLeftPos, setGhostsLeftPos] = useState<number[]>([]); // since we can have many ghost cursors
  const { width } = useAppSelector((state) => state.typingParagraphProp);
  const { cursors } = useAppSelector((state) => state.ghostCursor);

  useEffect(() => {
    if (isCurrent) setLeftPos(width * letterIndex + letterIndex * (width / 4));
  }, [width, isCurrent, letterIndex]);

  useEffect(() => {
    const ghostPos = cursors.map((cursor, i) => {
      if (cursor.wordIndex === index) {
        return cursor.letterIndex * width + cursor.letterIndex * (width / 4);
      }
      return 0;
    });
    setGhostsLeftPos(ghostPos);
  }, [width, cursors, index]);

  return (
    <div
      className="flex relative "
      id="wordContainer"
      ref={isCurrent ? currentWordRef : null}
    >
      <div className=" flex z-10" style={{ gap: width / 4 }}>
        {wordProp.word.split("").map((letter, index) => (
          <ShowLetterWithCursor
            letter={letter}
            key={index}
            error={wordProp.error?.letterError[index]}
          />
        ))}
      </div>
      {isCurrent && (
        <motion.div
          layoutId="cursor"
          ref={cursorRef}
          initial={{ x: leftPos }}
          animate={{ x: leftPos }}
          className={` absolute h-full bg-foreground rounded-lg animate-pulse z-10  ${
            !showCursor && "!opacity-0"
          } `}
          transition={{
            type: "tween",
            duration: 0.15,
          }}
          style={{ width: width / 4, left: -width / 4 }}
        />
      )}

      {cursors.map((cursor, i) =>
        cursor.wordIndex === index ? (
          <motion.div
            layoutId={`cursor-${i}`}
            key={i}
            initial={{ x: ghostsLeftPos[i] }}
            animate={{ x: ghostsLeftPos[i] }}
            className=" absolute h-full bg-ghost-cursor rounded-lg animate-pulse z-[5] "
            transition={{
              type: "tween",
              duration: 0.15,
            }}
            style={{ width: width / 6, left: -width / 4 }}
          />
        ) : null
      )}

      {!isCurrent && index < wordIndex && wordProp.error?.error && (
        <div className=" word-error "></div>
      )}
    </div>
  );
};

export default ShowWordWithCursor;
