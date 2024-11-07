import { createSlice } from "@reduxjs/toolkit";

interface TypingTestsProp {
  startTest: boolean;
  pauseTest: boolean;
  endTest: boolean;
  resetTrigger: boolean;
}

const initialState: TypingTestsProp = {
  startTest: false,
  pauseTest: false,
  endTest: false,
  resetTrigger: false,
};

const typingTests = createSlice({
  name: "typingTests",
  initialState,
  reducers: {
    setStartTest(state) {
      state.startTest = true;
      state.endTest = false;
      state.pauseTest = false;
    },
    setEndTest(state) {
      state.endTest = true;
      state.startTest = false;
      state.pauseTest = false;
    },
    setPauseTest(state) {
      state.pauseTest = true;
    },

    setresetTest(state) {
      state.startTest = false;
      state.endTest = false;
    },

    resetTrigger(state) {
      state.resetTrigger = !state.resetTrigger;
    },
  },
});

export const {
  setStartTest,
  setEndTest,
  setPauseTest,
  setresetTest,
  resetTrigger,
} = typingTests.actions;

export default typingTests.reducer;
