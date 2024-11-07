export function calculateWpm(numberOfWords: number, timeInMs: number) {
  const minutes = (timeInMs % 3600000) / 60000;
  return Math.round(numberOfWords / minutes);
}
