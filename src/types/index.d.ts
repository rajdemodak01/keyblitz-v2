interface LetterProp {
  height: number;
  width: number;
}

interface typingLetterError {
  error: boolean;
  letterError: number[];
}

interface wordProp {
  word: string;
  typedWord: string; // this is useful in case of backspace is clicked
  error: null | typingLetterError;
}
