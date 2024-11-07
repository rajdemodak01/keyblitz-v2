import { useMutableData } from "@/context/mutableDataProvider";
import { useEffect, useRef, useState } from "react";

export const useInputFocus = () => {
  const { resetTest } = useMutableData();

  const resetStates = () => {
    resetTest();
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
    setInputIsFocused(true);
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
