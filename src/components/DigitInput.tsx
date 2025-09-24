import React from "react";
import { Input } from "antd";
import type { DigitInputProps } from "../types/auth.ts";

const DigitInput: React.FC<DigitInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onPaste,
  disabled = false,
  error = false,
  inputRef,
  placeholder = "",
}) => (
  <Input
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    onPaste={onPaste}
    status={error ? "error" : undefined}
    inputMode="numeric"
    pattern="[0-9]*"
    size="large"
    maxLength={1}
    placeholder={placeholder}
    style={{
      width: 52,
      height: 60,
      textAlign: "center",
      fontSize: 18,
      fontWeight: 600,
    }}
    disabled={disabled}
  />
);

export default DigitInput;
