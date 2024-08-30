import React, { useCallback, useEffect } from "react";

interface KeyboardInputHandlerProps {
  children: React.ReactNode;
  handleFocus: () => void;
  inputIsFocused: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KeyboardInputHandler: React.FC<KeyboardInputHandlerProps> = ({
  children,
  handleFocus,
  inputIsFocused,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleEscape = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const handleTab = useCallback(() => {
    // Tab handling logic can be implemented here
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleEscape();
          break;
        case "Tab":
          handleTab();
          break;
        case "Enter":
          // Enter handling logic can be implemented here
          break;
        default:
          e.preventDefault();
          handleFocus();
      }
    },
    [handleFocus, handleEscape, handleTab]
  );

  useEffect(() => {
    const shouldAddListener = !inputIsFocused && !isModalOpen;

    if (shouldAddListener) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputIsFocused, isModalOpen, handleKeyDown]);

  return <>{children}</>;
};

export default KeyboardInputHandler;
