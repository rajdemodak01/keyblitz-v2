import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingWord {
  textArr: TextArr[];
  wordIndex: number;
  letterIndex: number;
}

interface ChangePropOfWordPayload {
  index: number;
  prop: TextArr;
}

const text =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, ipsum officiis amet placeat nesciunt assumenda voluptates! Provident officia illo corporis ";

const initialState: TypingWord = {
  textArr: text
    .trim()
    .split(" ")
    .map((w) => ({ word: w, level: 0, error: "error" })),
  wordIndex: 0,
  letterIndex: 0,
};

const typingWordSlice = createSlice({
  name: "typingWordSlice",
  initialState,
  reducers: {
    increaseWordIndex(state) {
      state.wordIndex++;
    },
    decreaseWordIndex(state) {
      state.wordIndex--;
    },
    increaseLetterIndex(state) {
      state.letterIndex++;
    },
    decreaseLetterIndex(state) {
      state.letterIndex--;
    },
    resetLetterIndex(state) {
      state.letterIndex = 0;
    },
    changePropOfWord(state, action: PayloadAction<ChangePropOfWordPayload>) {
      const { index, prop } = action.payload;
      if (index >= 0 && index < state.textArr.length) {
        state.textArr[index] = prop;
      }
    },
  },
});

export const {
  increaseWordIndex,
  decreaseWordIndex,
  increaseLetterIndex,
  decreaseLetterIndex,
  resetLetterIndex,
  changePropOfWord,
} = typingWordSlice.actions;
export default typingWordSlice.reducer;
