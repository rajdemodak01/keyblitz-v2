import { createSlice, PayloadAction, ReducerType } from "@reduxjs/toolkit";

interface IGhostCursor {
  cursors: {
    name: string;
    wordIndex: number;
    letterIndex: number;
    wpm: number;
  }[];
}

const initialState: IGhostCursor = {
  cursors: [
    { name: "cursor1", wordIndex: 0, letterIndex: 0, wpm: 60 },
    // { name: "cursor2", wordIndex: 0, letterIndex: 0, wpm: 70 },
    // { name: "cursor1", wordIndex: 11, letterIndex: 0 },
    // { name: "cursor1", wordIndex: 9, letterIndex: 0 },
  ],
};

const ghostCursor = createSlice({
  name: "ghostCursor",
  initialState,
  reducers: {
    setCursors(
      state,
      action: PayloadAction<{
        cursors: {
          name: string;
          wordIndex: number;
          letterIndex: number;
          wpm: number;
        }[];
      }>
    ) {
      state.cursors = action.payload.cursors;
    },
    changeCursorProp(
      state,
      action: PayloadAction<{
        index: number;
        prop: { wordIndex: number; letterIndex: number };
      }>
    ) {
      state.cursors[action.payload.index].wordIndex =
        action.payload.prop.wordIndex;
      state.cursors[action.payload.index].letterIndex =
        action.payload.prop.letterIndex;
    },
    resetCursor(state) {
      state.cursors.forEach((cursor) => {
        cursor.letterIndex = 0;
        cursor.wordIndex = 0;
      });
    },
  },
});

export const { setCursors, changeCursorProp, resetCursor } =
  ghostCursor.actions;

export default ghostCursor.reducer;
