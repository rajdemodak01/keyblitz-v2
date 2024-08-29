import { resetTest } from "@/lib/features/typingTests/typingTestsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";

export const useInputFocus = () => {
  const dispatch = useAppDispatch();

  const resetStates = () => {
    dispatch(resetTest());
  };
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();
  const handleFocus = () => {
    setInputIsFocused(true);
    focusInput();
  };
  const handleBlur = () => setInputIsFocused(false);

  useEffect(() => {
    focusInput();
  }, []);

  return {
    resetStates,
    inputRef,
    inputIsFocused,
    focusInput,
    handleFocus,
    handleBlur,
  };
};
