import {
  changeLetterIndex,
  changePropOfWord,
  changeWordIndex,
} from "@/lib/features/typingWord/typingWordSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

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
  const { wordArr, wordIndex, correctWordArr } = useAppSelector(
    (state) => state.typingWord
  );
  const { width: letterWidth } = useAppSelector(
    (state) => state.typingParagraphProp
  );

  const dispatch = useAppDispatch();

  function checkForError(
    index: number,
    inputElement: HTMLInputElement,
    isNewInput: boolean
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
  return (
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
  );
};

export default TypingParagraphInputBox;
