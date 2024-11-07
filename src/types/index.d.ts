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

interface ITestProp {
  totalTimeSpent: number;
  startTime: number;
  endTime: number;
  eachWordTimeSpent: number[];
  secondsCharTyped: {
    charTypedCount: number;
    correctCharTypedCount: number;
    errorCharTypedCount: number;
  }[];
  eachWordError: number[];
  totalCharTyped: number;
  totalCorrectCharTyped: number;
  wpm: number;
  accuracy: number;
}
