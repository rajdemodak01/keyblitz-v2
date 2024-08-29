import { useAppSelector } from "@/lib/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { gap } from "@/lib/constants";
import ChangeLevelOfTypingParagraph from "./changeLevelOfTypingParagraph";
import TypingParagraphInputBox from "./typingParagraphInputBox";
import WordDisplay from "./wordDisplay";
import Cursor from "./cursor";
import { useInputFocus } from "@/hooks/useInputFocus";
import CursorSVG from "@/images/cursor.svg";
import GhostCursor from "./GhostCursor";
import KeyboardInputHandler from "./KeyboardInputHandler";
import Modal from "./ui/Modal";

const TypingParagraph = () => {
  const { inputRef, focusInput, handleFocus, handleBlur, inputIsFocused } =
    useInputFocus();
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
  const { height: letterHeight } = useAppSelector(
    (state) => state.typingParagraphProp
  );

  const cursorRef = useRef<HTMLDivElement>(null);
  const typingParagraphRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);

  const [showOverlay, setShowOverlay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!inputIsFocused) {
      timeoutId = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);
    } else {
      setShowOverlay(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inputIsFocused]);

  useEffect(() => {
    if (!isModalOpen) {
      focusInput();
    }
  }, [focusInput, isModalOpen]);

  return (
    <ChangeLevelOfTypingParagraph
      currentWordRef={currentWordRef}
      setCursorPosition={setCursorPosition}
    >
      <KeyboardInputHandler
        handleFocus={handleFocus}
        inputIsFocused={inputIsFocused}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        {/* <Cursor cursorRef={cursorRef} cursorPosition={cursorPosition} /> */}
        {/* <GhostCursor typingParagraphRef={typingParagraphRef} /> */}
        <p className=" text-foreground-light text-center mb-8">
          press ESC for options
        </p>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <GhostCursor>
          <div
            className=" relative overflow-hidden select-none "
            style={{ height: `${letterHeight * 3 + gap * letterHeight * 2}px` }} // taking the 3 line height and 2 gap height
            onMouseDown={(e) => {
              e.preventDefault();
              handleFocus();
            }}
          >
            {showOverlay && (
              <div
                className=" absolute h-full w-full backdrop-blur-sm z-20 grid place-items-center cursor-pointer rounded-lg "
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
                showCursor={inputIsFocused}
              />
            </div>
            <TypingParagraphInputBox
              inputRef={inputRef}
              currentWordRef={currentWordRef}
              typingParagraphRef={typingParagraphRef}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </GhostCursor>
      </KeyboardInputHandler>
    </ChangeLevelOfTypingParagraph>
  );
};

export default TypingParagraph;
