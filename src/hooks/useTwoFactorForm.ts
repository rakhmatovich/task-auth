import { useState, useMemo, useCallback } from "react";
import {
  CODE_LENGTH,
  createEmptyCode,
  isCodeComplete,
  hasAnyInput,
} from "../utils/twoFactorHelpers";
import type { ValidationError } from "yup";
import { createTwoFactorSchema } from "../utils/twoFactorValidation";

export const useTwoFactorForm = () => {
  const [code, setCode] = useState<string[]>(createEmptyCode());
  const [errors, setErrors] = useState<string[]>(createEmptyCode());

  const schema = useMemo(() => createTwoFactorSchema(CODE_LENGTH), []);

  const updateDigit = useCallback(
    (index: number, value: string) => {
      if (index < 0 || index >= CODE_LENGTH) return;

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Clear error for this specific digit
      if (errors[index]) {
        const newErrors = [...errors];
        newErrors[index] = "";
        setErrors(newErrors);
      }
    },
    [code, errors]
  );

  const clearCode = useCallback(() => {
    setCode(createEmptyCode());
    setErrors(createEmptyCode());
  }, []);

  const setCodeFromArray = useCallback((newCode: string[]) => {
    const paddedCode = [...newCode];
    while (paddedCode.length < CODE_LENGTH) {
      paddedCode.push("");
    }
    setCode(paddedCode.slice(0, CODE_LENGTH));
  }, []);

  const validate = useCallback(async (): Promise<boolean> => {
    try {
      await schema.validate(code, { abortEarly: false });
      setErrors(createEmptyCode());
      return true;
    } catch (error) {
      if (error instanceof Error && "inner" in error) {
        const validationErrors = error as ValidationError;
        const newErrors = createEmptyCode();

        if (validationErrors.inner) {
          validationErrors.inner.forEach((err) => {
            if (err.path && typeof err.path === "string") {
              const match = err.path.match(/\[(\d+)\]/);
              if (match) {
                const index = parseInt(match[1], 10);
                if (index >= 0 && index < CODE_LENGTH) {
                  newErrors[index] = err.message;
                }
              }
            }
          });
        }
        setErrors(newErrors);
      }
      return false;
    }
  }, [code, schema]);

  const isComplete = useMemo(() => isCodeComplete(code), [code]);
  const anyTyped = useMemo(() => hasAnyInput(code), [code]);
  const codeString = useMemo(() => code.join(""), [code]);

  return {
    code,
    errors,
    updateDigit,
    clearCode,
    setCodeFromArray,
    validate,
    isComplete,
    anyTyped,
    codeString,
  };
};
