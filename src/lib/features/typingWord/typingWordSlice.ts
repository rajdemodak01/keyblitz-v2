import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingWord {
  wordArr: wordProp[];
  correctWordArr: string[];
  wordIndex: number;
  letterIndex: number;
}

interface ChangePropOfWordPayload {
  index: number;
  prop: wordProp;
}

const text =
  // "Lorem ipsum dolor sit amet consectetur";
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur earum delectus distinctio pariatur commodi possimus vitae consequatur debitis dolores exercitationem.";

const initialState: TypingWord = {
  wordArr: text
    .trim()
    .split(" ")
    .map((w) => ({ word: w, error: null, typedWord: "" })),
  correctWordArr: text.trim().split(" "),
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
    changeWordIndex(state, action: PayloadAction<number>) {
      state.wordIndex = action.payload;
    },
    changeLetterIndex(state, action: PayloadAction<number>) {
      state.letterIndex = action.payload;
    },
    changePropOfWord(state, action: PayloadAction<ChangePropOfWordPayload>) {
      const { index, prop } = action.payload;
      if (index >= 0 && index < state.wordArr.length) {
        state.wordArr[index] = prop;
      }
    },
    resetWords(state) {
      state.wordArr = text
        .trim()
        .split(" ")
        .map((w) => ({ word: w, error: null, typedWord: "" }));
      state.correctWordArr = text.trim().split(" ");
      state.wordIndex = 0;
      state.letterIndex = 0;
    },
  },
});

export const {
  // increaseWordIndex,
  // decreaseWordIndex,
  // increaseLetterIndex,
  // decreaseLetterIndex,
  // resetLetterIndex,
  changeWordIndex,
  changeLetterIndex,
  changePropOfWord,
  resetWords,
} = typingWordSlice.actions;
export default typingWordSlice.reducer;
