import { useRef, useCallback } from "react";
import type { InputRef } from "antd";
import {
  CODE_LENGTH,
  extractDigitsFromClipboard,
  sanitizeDigitInput,
} from "../utils/twoFactorHelpers";

export const useTwoFactorInputs = (
  code: string[],
  updateDigit: (index: number, value: string) => void,
  setCodeFromArray: (code: string[]) => void,
  clearServerError: () => void
) => {
  const inputsRef = useRef<(InputRef | null)[]>([]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < CODE_LENGTH) {
      inputsRef.current[index]?.focus();
    }
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const text = e.clipboardData.getData("text");
      const digits = extractDigitsFromClipboard(text, CODE_LENGTH);

      if (digits.length === 0) return;

      e.preventDefault();

      // Create new code array, preserving existing values where no paste data exists
      const newCode = [...code];
      digits.forEach((digit, index) => {
        if (index < CODE_LENGTH) {
          newCode[index] = digit;
        }
      });

      setCodeFromArray(newCode);

      // Focus the appropriate input
      const focusIndex = Math.min(digits.length, CODE_LENGTH - 1);
      setTimeout(() => focusInput(focusIndex), 0);
    },
    [code, setCodeFromArray, focusInput]
  );

  const handleInputChange = useCallback(
    (value: string, index: number) => {
      const sanitizedValue = sanitizeDigitInput(value);
      updateDigit(index, sanitizedValue);
      clearServerError();

      // Auto-focus next input if we have a value
      if (sanitizedValue && index < CODE_LENGTH - 1) {
        focusInput(index + 1);
      }

      return sanitizedValue;
    },
    [updateDigit, clearServerError, focusInput]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const currentValue = code[index] || "";

      switch (e.key) {
        case "Backspace":
          if (!currentValue && index > 0) {
            focusInput(index - 1);
          }
          break;
        case "ArrowLeft":
          if (index > 0) {
            focusInput(index - 1);
          }
          break;
        case "ArrowRight":
          if (index < CODE_LENGTH - 1) {
            focusInput(index + 1);
          }
          break;
        case "Delete":
          // Clear current input and stay focused
          updateDigit(index, "");
          break;
      }
    },
    [code, updateDigit, focusInput]
  );

  const focusFirstInput = useCallback(() => {
    focusInput(0);
  }, [focusInput]);

  const clearAllInputs = useCallback(() => {
    setCodeFromArray([]);
  }, [setCodeFromArray]);

  return {
    inputsRef,
    handlePaste,
    handleInputChange,
    handleKeyDown,
    focusFirstInput,
    clearAllInputs,
    focusInput,
  };
};
