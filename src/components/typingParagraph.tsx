import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef } from "react";
import ShowWordWithCursor from "./showWordWithCursor";
import {
  increaseLetterIndex,
  increaseWordIndex,
  resetLetterIndex,
} from "@/lib/features/typingWord/typingWordSlice";
import { motion } from "framer-motion";
import { gap } from "@/lib/constants";

type Props = {};

const TypingParagraph = (props: Props) => {
  const { textArr, wordIndex, letterIndex } = useAppSelector(
    (state) => state.typingWord
  );

  const { level, height } = useAppSelector(
    (state) => state.typingParagraphProp
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleUserTyping = ({ value }: HTMLInputElement) => {
    if (value.slice(-1) === " ") {
      // console.log("This is a space");
      dispatch(increaseWordIndex());
      dispatch(resetLetterIndex());
    } else {
      dispatch(increaseLetterIndex());
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div
      className=" relative overflow-hidden "
      style={{ height: `${height * 3 + gap * height * 2}px` }} // taking the 3 line height and 2 gap height
      onClick={focusInput}
    >
      <motion.div
        className=" flex gap-x-4 flex-wrap gap-y-pa text-pa justify-center relative "
        initial={{ y: 0 }}
        animate={{
          y: -1 * (level * height + Math.max(0, level) * height * gap), // move the total line height as well as the gap
        }}
        transition={{ type: "tween", duration: "0.2" }}
      >
        {textArr.map((wordProp, index) => (
          <ShowWordWithCursor
            wordProp={wordProp}
            index={index}
            isCurrent={index === wordIndex}
            letterIndex={letterIndex}
            key={index}
          />
        ))}
      </motion.div>
      <input
        type="text"
        ref={inputRef}
        className="absolute inset-0 outline-none border-none bg-transparent -z-10 appearance-none text-transparent user-select-none "
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          // console.log((e.target as HTMLInputElement).value);
          handleUserTyping(e.target as HTMLInputElement);
        }}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default TypingParagraph;
