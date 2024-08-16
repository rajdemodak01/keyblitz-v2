import React, { useEffect, useRef } from "react";
import ShowLetterWithCursor from "./showLetterWithCursor";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { increaseLevel } from "@/lib/features/typingParagraphProp/typingParagraphProp";
import { gap } from "@/lib/constants";

interface Props {
  wordProp: TextArr;
  index: number;
  letterIndex: number;
  isCurrent: boolean;
}

const ShowWordWithCursor = ({
  wordProp,
  index,
  letterIndex,
  isCurrent,
}: Props) => {
  const tempDivRef = useRef<HTMLDivElement>(null);
  const {
    width,
    level,
    height: letterHeight,
  } = useAppSelector((state) => state.typingParagraphProp);
  const dispatch = useAppDispatch();

  function changeLevelOfTypingParagraph() {
    const elementRect =
      tempDivRef.current?.parentElement?.getBoundingClientRect();
    const parentRect =
      tempDivRef.current?.parentElement?.parentElement?.getBoundingClientRect();

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

      if (h === totalLevel - 1) {
        dispatch(increaseLevel({ level: Math.max(0, h - 2) }));
        console.log("first change", h, totalLevel - 1);
      } else if (h > 1) {
        dispatch(increaseLevel({ level: h - 1 }));
        console.log("second change");
      }
    }
  }

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

  useEffect(() => {
    changeLevelOfTypingParagraph();
  }, [letterIndex]);

  return (
    <div className="flex relative">
      {isCurrent && (
        <motion.div
          layoutId="cursor"
          ref={tempDivRef}
          initial={{ x: 0 }}
          animate={{ x: width * letterIndex + letterIndex * (width / 4) }}
          transition={{ duration: 0.2 }}
          className=" absolute h-full bg-foreground rounded-lg animate-pulse"
          style={{ width: width / 4, left: -width / 4 }}
        />
      )}
      <div className=" flex " style={{ gap: width / 4 }}>
        {wordProp.word.split("").map((letter, index) => (
          <ShowLetterWithCursor letter={letter} key={index} />
        ))}
      </div>

      {/* {isCurrent && word.length === letterIndex ? (
        
      ) : (
        <div className=" w-1"></div>
      )} */}
    </div>
  );
};

export default ShowWordWithCursor;
