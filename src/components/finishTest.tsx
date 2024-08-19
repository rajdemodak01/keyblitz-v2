import { calculateTimeDiff } from "@/lib/calculateTimeDiff";
import { calculateWpm } from "@/lib/calculateWPM";
import { resetTest } from "@/lib/features/typingTests/typingTestsSlice";
import { resetWords } from "@/lib/features/typingWord/typingWordSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";

type Props = {};

function FinishTest({}: Props) {
  const {
    startTest,
    endTime,
    totalTimeSpent,
    totalCorrectCharTyped,
    totalCharTyped,
    eachWordTimeSpent,
    eachWordError,
  } = useAppSelector((state) => state.typingTests);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>Total Time Spent {totalTimeSpent} ms</div>
      <div>totalCorrectCharTyped {totalCorrectCharTyped}</div>
      <div>totalCharTyped {totalCharTyped}</div>

      {eachWordTimeSpent.slice(1).map((time, index) => {
        const { totalTimeMs } = calculateTimeDiff(
          eachWordTimeSpent[index],
          time
        );
        return (
          <p key={index + 1}>
            {index + 1} {"->"} {calculateWpm(1, totalTimeMs)} error:{" "}
            {eachWordError[index] || 0}
          </p>
        );
      })}
      <button
        onClick={() => {
          dispatch(resetTest());
          dispatch(resetWords());
        }}
      >
        reset
      </button>
    </div>
  );
}

export default FinishTest;
