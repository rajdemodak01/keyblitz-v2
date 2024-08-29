import { resetCursor } from "@/lib/features/ghostCursor/ghostCursor";
import {
  resetTest,
  resetTrigger,
} from "@/lib/features/typingTests/typingTestsSlice";
import { resetWords } from "@/lib/features/typingWord/typingWordSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export const useResetStates = () => {
  const dispatch = useAppDispatch();

  const resetStates = () => {
    dispatch(resetTrigger());
    dispatch(resetTest());
    dispatch(resetCursor());
    dispatch(resetWords());
  };

  useEffect(() => {}, []);

  return {
    resetStates,
  };
};
