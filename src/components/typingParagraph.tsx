import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";

import { gap } from "@/lib/constants";
import ChangeLevelOfTypingParagraph from "./changeLevelOfTypingParagraph";
import TypingParagraphInputBox from "./typingParagraphInputBox";
import WordDisplay from "./wordDisplay";
import Cursor from "./cursor";
import { useInputFocus } from "@/hooks/useInputFocus";
import CursorSVG from "@/images/cursor.svg";

const TypingParagraph = () => {
  const { inputRef, focusInput, handleFocus, handleBlur, inputIsFocused } =
    useInputFocus();
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
  const { height: letterHeight } = useAppSelector(
    (state) => state.typingParagraphProp
  );

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      e.preventDefault();
      handleFocus();
    };

    if (inputIsFocused === false) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputIsFocused]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const typingParagraphRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);

  return (
    <ChangeLevelOfTypingParagraph
      currentWordRef={currentWordRef}
      setCursorPosition={setCursorPosition}
    >
      <Cursor cursorRef={cursorRef} cursorPosition={cursorPosition} />

      <div
        className=" relative overflow-hidden select-none "
        style={{ height: `${letterHeight * 3 + gap * letterHeight * 2}px` }} // taking the 3 line height and 2 gap height
        onMouseDown={(e) => e.preventDefault()}
      >
        {!inputIsFocused && (
          <div
            className=" absolute border border-border h-full w-full backdrop-blur-sm z-20 grid place-items-center cursor-pointer rounded-lg "
            onClick={handleFocus}
          >
            <p className=" flex items-center gap-2">
              Click to focus <CursorSVG height="16" /> or press or key
            </p>
          </div>
        )}
        <div className="  flex relative w-full ">
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
