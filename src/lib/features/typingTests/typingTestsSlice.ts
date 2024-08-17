import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingTestsProp {
  totalTimeSpent: number;
  startTime: string;
  endTime: string;
  wpm: number;
  accuracy: number;
}

const initialState: TypingTestsProp = {
  totalTimeSpent: 0,
  startTime: "",
  endTime: "",
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
  },
});

export const {} = typingTests.actions;

export default typingTests.reducer;
