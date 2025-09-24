import React, { useRef, useEffect } from "react";
import { Input, Flex, Form, Typography } from "antd";
import type { InputRef } from "antd";

const { Text } = Typography;

type TwoFactorInputProps = {
  code: string[];
  errors: string[];
  onDigitChange: (index: number, value: string) => void;
  disabled?: boolean;
  serverError?: string;
  autoFocus?: boolean;
};

const TwoFactorInput: React.FC<TwoFactorInputProps> = ({
  code,
  errors,
  onDigitChange,
  disabled = false,
  serverError,
  autoFocus = true,
}) => {
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const CODE_LENGTH = 6;

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 1);
    onDigitChange(index, sanitizedValue);

    // Auto-focus next input
    if (sanitizedValue && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, CODE_LENGTH);

    digits.split("").forEach((digit, index) => {
      if (index < CODE_LENGTH) {
        onDigitChange(index, digit);
      }
    });

    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(digits.length, CODE_LENGTH - 1);
    setTimeout(() => inputRefs.current[focusIndex]?.focus(), 0);
  };

  return (
    <Form.Item>
      <Flex justify="space-between" align="center" gap={8}>
        {Array.from({ length: CODE_LENGTH }, (_, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={code[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            status={errors[index] || serverError ? "error" : undefined}
            inputMode="numeric"
            pattern="[0-9]*"
            size="large"
            maxLength={1}
            style={{
              width: 52,
              height: 60,
              textAlign: "center",
              fontSize: 18,
              fontWeight: 600,
            }}
            disabled={disabled}
            placeholder="•"
          />
        ))}
      </Flex>
      {serverError && (
        <Text type="danger" style={{ display: "block", marginTop: 8 }}>
          {serverError}
        </Text>
      )}
    </Form.Item>
  );
};

export default TwoFactorInput;
