import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import Chart from "./Chart";
import { useResetStates } from "@/hooks/useResetStates";
import { useMutableData } from "@/context/mutableDataProvider";

type Props = {};

function FinishTest({}: Props) {
  const {
    testProp: {
      current: { totalTimeSpent, totalCorrectCharTyped, totalCharTyped },
    },
  } = useMutableData();
  const { resetStates } = useResetStates();

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
        onClick={resetStates}
      >
        reset
      </button>
    </div>
  );
}

export default FinishTest;
