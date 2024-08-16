interface LetterProp {
  height: number;
  width: number;
}

type typingLetterError = "error";

interface TextArr {
  word: string;
  level: number;
  error: typingLetterError;
}
