import { createSlice, PayloadAction, ReducerType } from "@reduxjs/toolkit";

interface setLetterHeightWidthPayload {
  height: number;
  width: number;
}

interface TypingParagraphProp extends setLetterHeightWidthPayload {
  level: number;
  levelFromTop: number;
  currentWordPostiionFromParentContainer: {
    top: number;
    left: number;
  };
}

const initialState: TypingParagraphProp = {
  height: 0, // this is the size of the line height of the letter
  width: 0,
  currentWordPostiionFromParentContainer: {
    top: 0,
    left: 0,
  },
  level: 0,
  levelFromTop: 0,
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
    increaseLevel(
      state,
      action: PayloadAction<{ level: number; levelFromTop: number }>
    ) {
      state.level = action.payload.level;
      state.levelFromTop = action.payload.levelFromTop;
    },
    currentWordTopAndLeftPos(
      state,
      action: PayloadAction<{ topPos: number; leftPos: number }>
    ) {
      state.currentWordPostiionFromParentContainer = {
        top: action.payload.topPos,
        left: action.payload.leftPos,
      };
    },
  },
});

export const { setLetterHeightWidth, increaseLevel, currentWordTopAndLeftPos } =
  typingParagraphProp.actions;

export default typingParagraphProp.reducer;
