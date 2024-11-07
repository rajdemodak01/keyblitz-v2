import { getWordsToType } from "@/actions/getWordsToType";
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

// const text =
//   // "Lorem ipsum dolor sit amet consectetur";
//   // "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur earum delectus distinctio pariatur commodi possimus vitae consequatur debitis dolores exercitationem.";
//   "One of the most intriguing questions about aliens is why, if they exist, we haven't encountered them yet. This question is central to the Fermi Paradox, named after physicist Enrico Fermi.";
// // "from since man high not late right end little house";

// const initialState: TypingWord = {
//   wordArr: text
//     .trim()
//     .split(" ")
//     .map((w) => ({ word: w, error: null, typedWord: "" })),
//   correctWordArr: text.trim().split(" "),
//   wordIndex: 0,
//   letterIndex: 0,
// };

const initialState: TypingWord = {
  wordArr: [],
  correctWordArr: [],
  wordIndex: 0,
  letterIndex: 0,
};

const typingWordSlice = createSlice({
  name: "typingWordSlice",
  initialState,
  reducers: {
    setInitialWords(state) {
      const words = getWordsToType(1, 50);
      state.wordArr = words
        .trim()
        .split(" ")
        .map((w) => ({ word: w, error: null, typedWord: "" }));
      state.correctWordArr = words.trim().split(" ");
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
      const words = getWordsToType(1, 50);
      state.wordArr = words
        .trim()
        .split(" ")
        .map((w) => ({ word: w, error: null, typedWord: "" }));
      state.correctWordArr = words.trim().split(" ");
      state.letterIndex = 0;
      state.wordIndex = 0;
    },
  },
});

export const {
  setInitialWords,
  changeWordIndex,
  changeLetterIndex,
  changePropOfWord,
  resetWords,
} = typingWordSlice.actions;
export default typingWordSlice.reducer;
