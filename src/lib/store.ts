import { configureStore } from "@reduxjs/toolkit";
import typingWord from "./features/typingWord/typingWordSlice";
import typingParagraphProp from "./features/typingParagraphProp/typingParagraphProp";

export const makeStore = () => {
  return configureStore({
    reducer: {
      typingWord: typingWord,
      typingParagraphProp: typingParagraphProp,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
