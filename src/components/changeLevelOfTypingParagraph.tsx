import { gap } from "@/lib/constants";
import { increaseLevel } from "@/lib/features/typingParagraphProp/typingParagraphProp";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useCallback, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  currentWordRef: React.RefObject<HTMLDivElement>;
  setCursorPosition: React.Dispatch<
    React.SetStateAction<{
      left: number;
      top: number;
    }>
  >;
}

const ChangeLevelOfTypingParagraph = ({
  children,
  currentWordRef,
  setCursorPosition,
}: Props) => {
  const {
    height: letterHeight,
    width: letterWidth,
    level,
  } = useAppSelector((state) => state.typingParagraphProp);
  const { letterIndex, wordIndex } = useAppSelector(
    (state) => state.typingWord
  );

  const dispatch = useAppDispatch();

  const changeLevelOfTypingParagraph = useCallback(() => {
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
          top: 2 * letterHeight + 2 * letterHeight * gap,
          left:
            elementRect.left +
            letterWidth * letterIndex +
            letterIndex * (letterWidth / 4),
        });
        dispatch(increaseLevel({ level: h - 2 })); // for level 2
      } else {
        setCursorPosition({
          top: 1 * letterHeight + 1 * letterHeight * gap,
          left:
            elementRect.left +
            letterWidth * letterIndex +
            letterIndex * (letterWidth / 4),
        });
        dispatch(increaseLevel({ level: h - 1 })); // for level 1
      }
    }
  }, [
    currentWordRef,
    dispatch,
    letterHeight,
    letterIndex,
    letterWidth,
    level,
    setCursorPosition,
  ]);

  useEffect(() => {
    changeLevelOfTypingParagraph();
  }, [letterIndex, wordIndex, changeLevelOfTypingParagraph]);

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
  }, [changeLevelOfTypingParagraph]);

  return <>{children}</>;
};

export default ChangeLevelOfTypingParagraph;
