import { createSlice, PayloadAction, ReducerType } from "@reduxjs/toolkit";

interface setLetterHeightWidthPayload {
  height: number;
  width: number;
}

interface TypingParagraphProp extends setLetterHeightWidthPayload {
  level: number;
}

const initialState: TypingParagraphProp = {
  height: 0, // this is the size of the line height of the letter
  width: 0,
  level: 0,
};

const typingParagraphProp = createSlice({
  name: "typingParagraphProp",
  initialState,
  reducers: {
    setLetterHeightWidth(
      state,
      action: PayloadAction<setLetterHeightWidthPayload>
    ) {
      state.height = action.payload.height;
      state.width = action.payload.width;
    },
    increaseLevel(state, action: PayloadAction<{ level: number }>) {
      state.level = action.payload.level;
    },
  },
});

export const { setLetterHeightWidth, increaseLevel } =
  typingParagraphProp.actions;

export default typingParagraphProp.reducer;
