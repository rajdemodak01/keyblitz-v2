"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";

import { gap } from "@/lib/constants";
import ChangeLevelOfTypingParagraph from "./changeLevelOfTypingParagraph";
import TypingParagraphInputBox from "./typingParagraphInputBox";
import WordDisplay from "./wordDisplay";
import Cursor from "./cursor";
import { useInputFocus } from "@/hooks/useInputFocus";

type Props = {};

const TypingParagraph = (props: Props) => {
  const { inputRef, focusInput, handleFocus, handleBlur } = useInputFocus();
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
  const { height: letterHeight } = useAppSelector(
    (state) => state.typingParagraphProp
  );

  const cursorRef = useRef<HTMLDivElement>(null);
  const typingParagraphRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);

  return (
    <ChangeLevelOfTypingParagraph
      currentWordRef={currentWordRef}
      setCursorPosition={setCursorPosition}
    >
      <div
        className=" relative overflow-hidden "
        style={{ height: `${letterHeight * 3 + gap * letterHeight * 2}px` }} // taking the 3 line height and 2 gap height
        onClick={focusInput}
      >
        <div className="  flex relative w-full ">
          <Cursor cursorRef={cursorRef} cursorPosition={cursorPosition} />

          <WordDisplay
            typingParagraphRef={typingParagraphRef}
            cursorRef={cursorRef}
            currentWordRef={currentWordRef}
          />
        </div>
        <TypingParagraphInputBox
          inputRef={inputRef}
          currentWordRef={currentWordRef}
          typingParagraphRef={typingParagraphRef}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      </div>
    </ChangeLevelOfTypingParagraph>
  );
};

export default TypingParagraph;
