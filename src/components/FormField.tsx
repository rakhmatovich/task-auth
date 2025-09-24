import React from "react";
import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
import type { FormFieldProps } from "../types/auth";

const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  placeholder,
  type = "text",
  prefix,
  disabled = false,
  error,
  size = "large"
}) => (
  <Form.Item
    validateStatus={error ? "error" : undefined}
    help={error}
  >
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          prefix={prefix}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          autoComplete={type === "password" ? "current-password" : "email"}
        />
      )}
    />
  </Form.Item>
);

export default FormField;