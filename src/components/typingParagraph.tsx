import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";
import ShowWordWithCursor from "./showWordWithCursor";
import {
  changeLetterIndex,
  changePropOfWord,
  changeWordIndex,
} from "@/lib/features/typingWord/typingWordSlice";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { gap } from "@/lib/constants";
import { increaseLevel } from "@/lib/features/typingParagraphProp/typingParagraphProp";

type Props = {};

const TypingParagraph = (props: Props) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
  const { wordArr, wordIndex, letterIndex, correctWordArr } = useAppSelector(
    (state) => state.typingWord
  );
  const { width: letterWidth, height: letterHeight } = useAppSelector(
    (state) => state.typingParagraphProp
  );

  const { level, height } = useAppSelector(
    (state) => state.typingParagraphProp
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const typingParagraphRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleUserTyping = ({ value }: HTMLInputElement) => {
    if (value.slice(-1) === " ") {
      // console.log("This is a space");
      dispatch(changeWordIndex(wordIndex + 1));
      dispatch(changeLetterIndex(0));
    } else {
      dispatch(changeLetterIndex(letterIndex + 1));
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleFocus = () => setInputIsFocused(true);
  const handleBlur = () => setInputIsFocused(false);

  function checkForError(
    index: number,
    inputElement: HTMLInputElement,
    isNewInput: boolean
  ) {
    const { value: typedWord } = inputElement;
    const correctWord = correctWordArr[index];
    const wordToShow = typedWord + correctWord.slice(typedWord.length);
    // if (value.slice(-1) === " ") {
    //   // console.log("This is a space");
    //   dispatch(increaseWordIndex());
    //   dispatch(resetLetterIndex());
    // } else {
    //   dispatch(increaseLetterIndex());
    // }

    const cursorRect = currentWordRef.current?.getBoundingClientRect();
    const parentRect = typingParagraphRef.current?.getBoundingClientRect();

    if (cursorRect && parentRect) {
      /*

        now finding the error
        for every letter and for a word so the error format should be
        sth like 

        error:{
         error: true, // this is for the word error
         // now for each letter the error can be dark error or light error

         letterError:[0 | 1 | 2, 0 | 1 | 2 ....]  0 -> no error
                                                  1 -> soft error -> this occurs when the user overtypes
                                                  2 -> dark error -> this occurs when the wrong letter is typed 
        }

        */
      let wordError = typedWord.length !== correctWord.length;
      const letterError = typedWord.split("").map((letter, index) => {
        if (index > correctWord.length - 1) {
          wordError = true;
          return 1;
        } else if (letter === correctWord[index]) {
          return 0;
        } else {
          wordError = true;
          return 2;
        }
      });

      if (
        parentRect.right - cursorRect.right > letterWidth ||
        !isNewInput ||
        typedWord.length <= correctWord.length
      ) {
        dispatch(changeLetterIndex(typedWord.length));

        dispatch(
          changePropOfWord({
            index,
            prop: {
              word: wordToShow,
              error: { error: wordError, letterError },
              typedWord: typedWord,
            },
          })
        );
      } else {
        // console.log(isNewInput, typedWord, typedWord.slice(0, -1));
        inputElement.value = typedWord.slice(0, -1);
      }
    }
  }

  function changeLevelOfTypingParagraph() {
    const elementRect = currentWordRef.current?.getBoundingClientRect();
    const parentRect =
      currentWordRef.current?.parentElement?.getBoundingClientRect();

    if (elementRect && parentRect) {
      const topRelativeToParent = elementRect.top - parentRect.top;

      /* Math for this totalLevel and h // h is the height of cursor from the overall paragraph like seen top 
      let totalLevel = n and h is letter height and we are taking also g is the gap to height ratio in terms of rem

      n * h + (n - 1) * g * h = totalHeight (ie. totalHeight = parentRect.height)

      now solve for n and we get 
      n = (totalHeight + g * h) / (h + g * h)

      */

      let totalHeight = parentRect.height;

      const totalLevel = Math.round(
        (totalHeight + gap * letterHeight) / (letterHeight + gap * letterHeight)
      );

      totalHeight = topRelativeToParent;

      const h = Math.round(
        (totalHeight + gap * letterHeight) / (letterHeight + gap * letterHeight)
      );

      console.log(
        h,
        totalLevel - 1,
        level,
        parentRect.height,
        letterHeight,
        gap * letterHeight
      );

      if (h === 0) {
        dispatch(increaseLevel({ level: 0 })); // for level 0
        setCursorPosition({
          top: 0,
          left:
            elementRect.left +
            letterWidth * letterIndex +
            letterIndex * (letterWidth / 4),
        });
      } else if (h === totalLevel - 1) {
        setCursorPosition({
          top: 2 * height + 2 * height * gap,
          left:
            elementRect.left +
            letterWidth * letterIndex +
            letterIndex * (letterWidth / 4),
        });
        dispatch(increaseLevel({ level: h - 2 })); // for level 2
      } else {
        setCursorPosition({
          top: 1 * height + 1 * height * gap,
          left:
            elementRect.left +
            letterWidth * letterIndex +
            letterIndex * (letterWidth / 4),
        });
        dispatch(increaseLevel({ level: h - 1 })); // for level 1
      }
    }
  }

  useEffect(() => {
    changeLevelOfTypingParagraph();
  }, [letterIndex, wordIndex]);

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: unknown, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    } as T;
  }

  useEffect(() => {
    const debouncedChangeLevel = debounce(changeLevelOfTypingParagraph, 300);

    function handleResize() {
      debouncedChangeLevel();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className=" relative overflow-hidden "
      style={{ height: `${height * 3 + gap * height * 2}px` }} // taking the 3 line height and 2 gap height
      onClick={focusInput}
    >
      <div className="  flex relative w-full ">
        <div
          ref={cursorRef}
          // initial={{ x: 0 }}
          // layout
          // animate={{
          //   x: cursorPosition.left,
          //   y: cursorPosition.top,
          // }}
          // transition={{ duration: 0.01, type: "tween" }}
          className=" absolute bg-foreground rounded-lg animate-pulse z-10 "
          style={{
            width: letterWidth / 4,
            left: -letterWidth / 4,
            height: letterHeight,
            // translate: (cursorPosition.left, cursorPosition.top),
            transform: `translate(${cursorPosition.left}px, ${cursorPosition.top}px)`,
            transition: "all 0.05s ease-in-out",
          }}
        />
        <motion.div
          className=" flex flex-wrap gap-y-pa text-pa relative w-full mx-8 "
          initial={{ y: 0 }}
          animate={{
            y: -1 * (level * height + Math.max(0, level) * height * gap), // move the total line height as well as the gap
          }}
          transition={{ type: "tween", duration: "0.2" }}
          style={{
            columnGap: 1.5 * letterWidth,
          }}
          ref={typingParagraphRef}
        >
          {wordArr.map((wordProp, index) => (
            <ShowWordWithCursor
              wordProp={wordProp}
              index={index}
              wordIndex={wordIndex}
              cursorRef={cursorRef}
              currentWordRef={currentWordRef}
              isCurrent={index === wordIndex}
              letterIndex={letterIndex}
              key={index}
            />
          ))}
        </motion.div>
      </div>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        className="absolute inset-0 outline-none border-none bg-transparent -z-10 appearance-none text-transparent user-select-none "
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          const inputElement = e.target as HTMLInputElement;
          if (e.ctrlKey && e.key === "Backspace") {
            if (inputValue === "" && wordIndex - 1 >= 0) {
              setInputValue(wordArr[wordIndex - 1].typedWord + " ");
              dispatch(changeWordIndex(wordIndex - 1));
            }
            console.log("Ctrl+Backspace pressed");
          } else if (e.key === "Backspace") {
            if (inputValue === "" && wordIndex - 1 >= 0) {
              setInputValue(wordArr[wordIndex - 1].typedWord + " ");
              dispatch(changeWordIndex(wordIndex - 1));
            }

            console.log("Backspace pressed");
          }
        }}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const inputElement = e.target as HTMLInputElement;

          const keyInput = (e.nativeEvent as InputEvent).data;

          if (keyInput === " ") {
            if (inputElement.value !== " " && wordIndex < wordArr.length) {
              inputElement.value = "";
              dispatch(changeWordIndex(wordIndex + 1));
              dispatch(changeLetterIndex(0));
            } else {
              inputElement.value = "";
            }
          } else {
            // handleUserTyping(inputElement);
            // console.log(keyInput, inputElement.value, wordIndex - 1);
            console.log(keyInput);

            checkForError(wordIndex, inputElement, keyInput !== null);

            const wordProp = wordArr[wordIndex];

            wordProp.word;

            // dispatch(
            //   changePropOfWord({
            //     index: wordIndex,
            //     prop: { ...wordArr[wordIndex], word: inputElement.value },
            //   })
            // );
          }

          setInputValue(inputElement.value);

          // Log the key input
          // console.log(`Key input: ${keyInput}`);
          // console.log(`value: ${inputElement.value}`);

          // Handle the input event
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default TypingParagraph;
