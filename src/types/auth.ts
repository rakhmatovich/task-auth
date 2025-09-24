import type { InputRef } from "antd";
import type { ClipboardEvent, KeyboardEvent, Ref } from "react";
import type { Control } from "react-hook-form";

export type LoginFormDataType = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token?: string;
  user?: {
    id: number;
    email: string;
    name?: string;
  };
  requiresTwoFactor?: boolean;
};

export type FormFieldProps = {
  name: "email" | "password";
  control: Control<LoginFormDataType>;
  placeholder: string;
  type?: string;
  prefix?: React.ReactNode;
  disabled?: boolean;
  error?: string;
  size?: "small" | "middle" | "large";
};

export type TwoFactorFormData = {
  code: string[];
};

export type DigitInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  inputRef?: Ref<InputRef>;
  placeholder?: string;
};
