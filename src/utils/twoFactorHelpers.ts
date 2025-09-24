export const CODE_LENGTH = 6;

export const formatSecondsToMMSS = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export const extractDigitsFromClipboard = (
  text: string,
  maxLength: number = CODE_LENGTH
): string[] => {
  return text.replace(/\D/g, "").slice(0, maxLength).split("");
};

export const createEmptyCode = (length: number = CODE_LENGTH): string[] => {
  return Array(length).fill("");
};

export const codeArrayToString = (code: string[]): string => {
  return code.join("");
};

export const isValidDigit = (value: string): boolean => {
  return /^[0-9]$/.test(value);
};

export const isCodeComplete = (code: string[]): boolean => {
  return (
    code.length === CODE_LENGTH && code.every((digit) => isValidDigit(digit))
  );
};

export const hasAnyInput = (code: string[]): boolean => {
  return code.some((digit) => digit !== "");
};

export const sanitizeDigitInput = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 1);
};
