"use client";

import {
  setEndTest,
  setresetTest,
  setStartTest,
} from "@/lib/features/typingTests/typingTestsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { calculateTimeDiff } from "@/utils/calculateTimeDiff";
import { createContext, MutableRefObject, useContext, useRef } from "react";

interface IMutableDataContext {
  testProp: MutableRefObject<ITestProp>;
  startTestMethod: () => void;
  endTestMethod: () => void;
  pauseTestMethod: () => void;
  increaseTotalCharTyped: () => void;
  increaseTotalCorrectCharTyped: () => void;
  resetTest: () => void;
  addWordTimeStamp: (obj: { index: number; timeStamp: number }) => void;
  addEachSecondWordTyped: (obj: {
    charTypedCount: number;
    correctCharTypedCount: number;
  }) => void;
  addEachWordError: (obj: { index: number }) => void;
}

interface IMutableDataProvider {
  children: React.ReactNode;
}

const MutableDataContext = createContext<IMutableDataContext | null>(null);

function MutableDataProvider(props: IMutableDataProvider) {
  const { children } = props;
  const testProp = useRef<ITestProp>({
    totalTimeSpent: 0,
    startTime: 0,
    endTime: 0,
    eachWordTimeSpent: [],
    secondsCharTyped: [],
    eachWordError: [],
    totalCharTyped: 0,
    totalCorrectCharTyped: 0,
    wpm: -1,
    accuracy: -1,
  });

  const dispatch = useAppDispatch();

  const startTestMethod = () => {
    testProp.current = { ...testProp.current, startTime: Date.now() };
    dispatch(setStartTest());
  };

  const endTestMethod = () => {
    testProp.current.endTime = Date.now();
    const { totalTimeMs } = calculateTimeDiff(
      testProp.current.startTime,
      testProp.current.endTime
    );

    testProp.current.totalTimeSpent += totalTimeMs;
    dispatch(setEndTest());
  };

  const pauseTestMethod = () => {
    const { totalTimeMs } = calculateTimeDiff(
      testProp.current.startTime,
      Date.now()
    );

    testProp.current.totalTimeSpent += totalTimeMs;

    testProp.current.startTime = 0;
    testProp.current.endTime = 0;
  };

  const increaseTotalCharTyped = () => {
    testProp.current.totalCharTyped += 1;
  };

  const increaseTotalCorrectCharTyped = () => {
    testProp.current.totalCorrectCharTyped += 1;
  };

  const resetTest = () => {
    testProp.current.totalTimeSpent = 0;
    testProp.current.startTime = 0;
    testProp.current.endTime = 0;
    testProp.current.eachWordTimeSpent = [];
    testProp.current.secondsCharTyped = [];
    testProp.current.eachWordError = [];
    testProp.current.totalCharTyped = 0;
    testProp.current.totalCorrectCharTyped = 0;
    testProp.current.wpm = -1;
    testProp.current.accuracy = -1;
    dispatch(setresetTest());
  };

  const addWordTimeStamp = ({
    index,
    timeStamp,
  }: {
    index: number;
    timeStamp: number;
  }) => {
    testProp.current.eachWordTimeSpent[index] = timeStamp;
  };

  const addEachSecondWordTyped = ({
    charTypedCount,
    correctCharTypedCount,
  }: {
    charTypedCount: number;
    correctCharTypedCount: number;
  }) => {
    testProp.current.secondsCharTyped.push({
      charTypedCount: charTypedCount,
      correctCharTypedCount: correctCharTypedCount,
      errorCharTypedCount: charTypedCount - correctCharTypedCount,
    });
  };

  const addEachWordError = ({ index }: { index: number }) => {
    if (testProp.current.eachWordError[index] === undefined) {
      testProp.current.eachWordError[index] = 1;
    } else {
      testProp.current.eachWordError[index]++;
    }
  };

  return (
    <MutableDataContext.Provider
      value={{
        testProp,
        startTestMethod,
        endTestMethod,
        pauseTestMethod,
        increaseTotalCharTyped,
        increaseTotalCorrectCharTyped,
        resetTest,
        addWordTimeStamp,
        addEachSecondWordTyped,
        addEachWordError,
      }}
    >
      {children}
    </MutableDataContext.Provider>
  );
}

export const useMutableData = () => {
  const context = useContext(MutableDataContext);

  if (context == null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default MutableDataProvider;
