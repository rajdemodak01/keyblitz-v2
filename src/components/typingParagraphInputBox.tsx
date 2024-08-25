import {
  addEachWordError,
  addSecondsWordTyped,
  addWordTimeStamp,
  increaseTotalCharTyped,
  increaseTotalCorrectCharTyped,
  setEndTest,
  setStartTest,
} from "@/lib/features/typingTests/typingTestsSlice";
import {
  changeLetterIndex,
  changePropOfWord,
  changeWordIndex,
} from "@/lib/features/typingWord/typingWordSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  currentWordRef: React.RefObject<HTMLDivElement>;
  typingParagraphRef: React.RefObject<HTMLDivElement>;
  handleFocus: () => void;
  handleBlur: () => void;
}

const TypingParagraphInputBox = ({
  inputRef,
  currentWordRef,
  typingParagraphRef,
  handleFocus,
  handleBlur,
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const { wordArr, wordIndex, letterIndex, correctWordArr } = useAppSelector(
    (state) => state.typingWord
  );
  const { width: letterWidth } = useAppSelector(
    (state) => state.typingParagraphProp
  );
  const { startTest, endTest } = useAppSelector((state) => state.typingTests);

  // this variable is used for the addSecondsWordTyped
  const charTypedCount = useRef<number>(0);
  const correctCharTypedCount = useRef<number>(0);

  const dispatch = useAppDispatch();

  function checkForError(
    index: number,
    inputElement: HTMLInputElement,
    isNewInput: boolean,
    newInput: null | string // null if there is now new Input
  ) {
    const { value: typedWord } = inputElement;
    const correctWord = correctWordArr[index];
    const wordToShow = typedWord + correctWord.slice(typedWord.length);

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
        // now check if the char typed is correct or not;
        if (isNewInput) {
          if (newInput === correctWord[letterIndex]) {
            // correct character is typed
            dispatch(increaseTotalCorrectCharTyped());
            correctCharTypedCount.current++;
            dispatch(increaseTotalCharTyped());
            charTypedCount.current++;
            // console.log("correct char", newInput, correctWord[letterIndex]);
          } else {
            // incorrect character is typed
            dispatch(increaseTotalCharTyped());
            charTypedCount.current++;
            dispatch(addEachWordError(wordIndex));
            // console.log("incorrect char", newInput, correctWord[letterIndex]);
          }
        }

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (startTest && !endTest) {
      intervalId = setInterval(() => {
        dispatch(
          addSecondsWordTyped({
            charTypedCount: charTypedCount.current,
            correctCharTypedCount: correctCharTypedCount.current,
          })
        );

        charTypedCount.current = 0;
        correctCharTypedCount.current = 0;
      }, 1000);
    }

    if (endTest && intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTest, endTest, dispatch]);

  return (
    <input
      type="text"
      ref={inputRef}
      value={inputValue}
      disabled={endTest}
      className="absolute inset-0 outline-none border-none bg-transparent -z-10 appearance-none text-transparent user-select-none "
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
          if (inputElement.value !== " ") {
            inputElement.value = "";
            if (startTest && wordIndex === wordArr.length - 1) {
              dispatch(setEndTest());
              console.log("The test has ended");
            }
            dispatch(increaseTotalCorrectCharTyped());
            charTypedCount.current++;
            dispatch(increaseTotalCharTyped());
            correctCharTypedCount.current++;
            dispatch(changeWordIndex(wordIndex + 1));
            dispatch(changeLetterIndex(0));
            dispatch(
              addWordTimeStamp({ index: wordIndex, timeStamp: Date.now() })
            );
          } else {
            inputElement.value = "";
          }
        } else {
          if (
            wordIndex === 0 &&
            letterIndex === 0 &&
            keyInput !== null &&
            !startTest
          ) {
            dispatch(setStartTest());
            console.log("The test has started");
          }

          checkForError(wordIndex, inputElement, keyInput !== null, keyInput);
        }

        setInputValue(inputElement.value);
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
      spellCheck="false"
    />
  );
};

export default TypingParagraphInputBox;
