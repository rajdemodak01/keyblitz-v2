import React, { useCallback, useEffect } from "react";

interface IKeyboardInputHandlerProps {
  children: React.ReactNode;
  handleFocus: () => void;
  inputIsFocused: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const KeyboardInputHandler = (props: IKeyboardInputHandlerProps) => {
  const { children, handleFocus, inputIsFocused, isModalOpen, setIsModalOpen } =
    props;

  const onEscape = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const onTab = useCallback(() => {}, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }

      if (e.key === "Tab") {
        onTab?.();
        return;
      }

      if (e.key === "Enter") {
        return;
      }

      e.preventDefault();
      handleFocus();
    },
    [handleFocus, onEscape, onTab]
  );

  useEffect(() => {
    if (inputIsFocused === false && isModalOpen === false) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputIsFocused, isModalOpen, handleKeyDown]);

  return <>{children}</>;
};

export default KeyboardInputHandler;
