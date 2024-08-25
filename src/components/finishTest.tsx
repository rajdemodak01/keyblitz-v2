import { resetTest } from "@/lib/features/typingTests/typingTestsSlice";
import { resetWords } from "@/lib/features/typingWord/typingWordSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import Chart from "./Chart";

type Props = {};

function FinishTest({}: Props) {
  const { totalTimeSpent, totalCorrectCharTyped, totalCharTyped } =
    useAppSelector((state) => state.typingTests);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>Total Time Spent {totalTimeSpent} ms</div>
      <div>totalCorrectCharTyped {totalCorrectCharTyped}</div>
      <div>totalCharTyped {totalCharTyped}</div>
      <div className=" h-[250px] ">
        <Chart />
      </div>
      <button
        className=" border-border border py-2 px-4 rounded-lg hover:bg-foreground-light"
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
