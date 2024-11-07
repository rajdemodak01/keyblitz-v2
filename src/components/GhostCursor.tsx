import { changeCursorProp } from "@/lib/features/ghostCursor/ghostCursor";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

interface IGhostCursorProps {
  children: React.ReactNode;
}

const GhostCursor = (props: IGhostCursorProps) => {
  const { children } = props;

  const { startTest, endTest } = useAppSelector((state) => state.typingTests);
  const { cursors: globalCursor } = useAppSelector(
    (state) => state.ghostCursor
  );
  const { correctWordArr } = useAppSelector((state) => state.typingWord);

  const dispatch = useAppDispatch();

  const timersRef = useRef<(NodeJS.Timeout | null)[]>([]);
  const cursorsRef = useRef(globalCursor);

  /*
    for now the bot doesn't makes any mistakes this will be part of version-2

    first count the characters in the paragraph then use this formula to calculate the time
    time in min = total char / (5 * wpm)

    this time is the total time to complete the test for the ghost
    now use this time in percentage basis for each words  
    so we have a variable time for each word but constant time for each character 
    so use this character time in the setInterval and increase the letterIndex

    now when to increase the wordIndex?

  */

  useEffect(() => {
    cursorsRef.current = globalCursor;
  }, [globalCursor]);

  const totalCharCount = useMemo(
    () => correctWordArr.reduce((acc, word) => acc + word.length, 0),
    [correctWordArr]
  );

  const setupCursorInterval = useCallback(
    (cursorIndex: number) => {
      const totalCharCount = correctWordArr.reduce(
        (acc, word) => acc + word.length,
        0
      );
      const cursor = cursorsRef.current[cursorIndex];
      const time = totalCharCount / (5 * cursor.wpm); // in minutes
      const eachCharTime = (time / totalCharCount) * 60 * 1000; // in ms

      return setInterval(() => {
        const currentCursor = cursorsRef.current[cursorIndex];
        if (currentCursor.wordIndex >= correctWordArr.length) {
          clearInterval(timersRef.current[cursorIndex] as NodeJS.Timeout);
          timersRef.current[cursorIndex] = null;
          return;
        }

        // console.log(`timer ${cursorIndex} running`);

        if (
          correctWordArr[currentCursor.wordIndex] &&
          currentCursor.letterIndex + 1 <
            correctWordArr[currentCursor.wordIndex].length
        ) {
          dispatch(
            changeCursorProp({
              index: cursorIndex,
              prop: {
                letterIndex: currentCursor.letterIndex + 1,
                wordIndex: currentCursor.wordIndex,
              },
            })
          );
        } else {
          dispatch(
            changeCursorProp({
              index: cursorIndex,
              prop: { letterIndex: 0, wordIndex: currentCursor.wordIndex + 1 },
            })
          );
        }
      }, eachCharTime);
    },
    [correctWordArr, dispatch]
  );

  useEffect(() => {
    const isTestRunning = startTest && !endTest; // will be true even in paused state

    if (isTestRunning) {
      cursorsRef.current.forEach((_, index) => {
        // console.log("setting up timer", index);
        timersRef.current[index] = setupCursorInterval(index);
      });
    } else {
      timersRef.current.forEach((timer) => {
        if (timer) {
          clearInterval(timer);
        }
      });
      timersRef.current = [];
    }

    return () => {
      timersRef.current.forEach((timer) => {
        if (timer) {
          clearInterval(timer);
        }
      });
    };
  }, [startTest, endTest, setupCursorInterval]);

  return <>{children}</>;
};

export default GhostCursor;
