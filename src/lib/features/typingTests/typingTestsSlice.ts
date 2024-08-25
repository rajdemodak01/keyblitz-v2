import { calculateTimeDiff } from "@/lib/calculateTimeDiff";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingTestsProp {
  startTest: boolean;
  endTest: boolean;
  totalTimeSpent: number;
  startTime: number;
  endTime: number;
  eachWordTimeSpent: number[];
  secondsCharTyped: {
    charTypedCount: number;
    correctCharTypedCount: number;
    errorCharTypedCount: number;
  }[];
  eachWordError: number[];
  totalCharTyped: number;
  totalCorrectCharTyped: number;
  wpm: number;
  accuracy: number;
}

const initialState: TypingTestsProp = {
  startTest: false,
  endTest: false,
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
};

const typingTests = createSlice({
  name: "typingTests",
  initialState,
  reducers: {
    // addTime(state, action){
    //     state.totalTimeSpent +=
    // }
    setStartTest(state) {
      state.startTest = true;
      state.startTime = Date.now();
    },
    setEndTest(state) {
      state.endTest = true;
      state.endTime = Date.now();
      //   const totalTimeMs = state.endTime - state.startTime;
      //   state.totalTimeSpent += totalTimeMs;
      //   const minutes = Math.floor((totalTimeMs % 3600000) / 60000);
      //   const seconds = Math.floor((totalTimeMs % 60000) / 1000);
      //   const milliseconds = totalTimeMs % 1000;

      const { totalTimeMs } = calculateTimeDiff(state.startTime, state.endTime);

      state.totalTimeSpent += totalTimeMs;

      //   console.log(
      //     `Total time spent -> ${minutes}m ${seconds}s ${milliseconds}ms`,
      //     `(${totalTimeMs} ms total)`
      //   );
    },
    increaseTotalCharTyped(state) {
      state.totalCharTyped += 1;
    },
    increaseTotalCorrectCharTyped(state) {
      state.totalCorrectCharTyped += 1;
    },
    resetTest(state) {
      state.startTest = false;
      state.endTest = false;
      state.totalTimeSpent = 0;
      state.startTime = 0;
      state.endTime = 0;
      state.totalCharTyped = 0;
      state.totalCorrectCharTyped = 0;
      state.wpm = -1;
      state.accuracy = -1;
    },
    addWordTimeStamp(
      state,
      action: PayloadAction<{ index: number; timeStamp: number }>
    ) {
      const { index, timeStamp } = action.payload;
      state.eachWordTimeSpent[index] = timeStamp;
    },

    addSecondsWordTyped(
      state,
      action: PayloadAction<{
        charTypedCount: number;
        correctCharTypedCount: number;
      }>
    ) {
      console.log(action.payload);

      state.secondsCharTyped.push({
        charTypedCount: action.payload.charTypedCount,
        correctCharTypedCount: action.payload.correctCharTypedCount,
        errorCharTypedCount:
          action.payload.charTypedCount - action.payload.correctCharTypedCount,
      });
    },

    addEachWordError(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (state.eachWordError[index] === undefined) {
        state.eachWordError[index] = 1;
      } else {
        state.eachWordError[index]++;
      }
    },
  },
});

export const {
  increaseTotalCharTyped,
  increaseTotalCorrectCharTyped,
  setStartTest,
  setEndTest,
  resetTest,
  addWordTimeStamp,
  addSecondsWordTyped,
  addEachWordError,
} = typingTests.actions;

export default typingTests.reducer;
