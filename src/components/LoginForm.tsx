import React from "react";
import { Form, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import FormField from "./FormField";
import type { LoginFormDataType } from "../types/auth";
import type { Control } from "react-hook-form";

type LoginFormProps = {
  control: Control<LoginFormDataType>;
  errors: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  isSubmitDisabled: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({
  control,
  errors,
  onSubmit,
  isLoading,
  isSubmitDisabled,
}) => (
  <Form layout="vertical" style={{ width: "100%" }} onFinish={onSubmit}>
    <FormField
      name="email"
      control={control}
      placeholder="Email"
      prefix={<UserOutlined style={{ color: "#00000073" }} />}
      error={errors.email?.message}
      disabled={isLoading}
    />

    <FormField
      name="password"
      control={control}
      placeholder="Password"
      type="password"
      prefix={<LockOutlined style={{ color: "#00000073" }} />}
      error={errors.password?.message}
      disabled={isLoading}
    />

    <Form.Item>
      <Button
        block
        type="primary"
        htmlType="submit"
        size="large"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </Form.Item>
  </Form>
);

export default LoginForm;
