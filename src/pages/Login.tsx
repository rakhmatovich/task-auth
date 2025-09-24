import React from "react";
import { Typography } from "antd";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";
import ErrorAlert from "../components/ErrorAlert";
import LoginContainer from "../components/LoginContainer";
import AuthHeaderLogo from "../components/AuthHeaderLogo";
import type { LoginFormDataType } from "../types/auth";
import { useLoginForm } from "../hooks/useLoginForm";
import { useAuthMutation } from "../hooks/useAuthMutation";

const { Title } = Typography;

const Login: React.FC = () => {
  const { control, handleSubmit, errors, isSubmitDisabled } = useLoginForm();

  const {
    login,
    isLoading,
    isError,
    errorMessage,
    reset: resetMutation,
  } = useAuthMutation();

  const onSubmit = async (data: LoginFormDataType) => {
    try {
      await login(data);
    } catch (error) {
      console.error("Login submission failed:", error);
    }
  };

  const handleErrorClose = () => {
    resetMutation();
  };

  return (
    <AuthLayout>
      <LoginContainer>
        <div>
          <AuthHeaderLogo />

          <Title
            level={3}
            style={{
              textAlign: "center",
              fontWeight: 600,
              marginTop: 4,
              marginBottom: 0,
              lineHeight: 1.3,
            }}
          >
            Sign in to your account to <br /> continue
          </Title>
        </div>

        {isError && errorMessage && (
          <ErrorAlert
            message={errorMessage}
            onClose={handleErrorClose}
            closable
          />
        )}

        <LoginForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isSubmitDisabled={isSubmitDisabled}
        />
      </LoginContainer>
    </AuthLayout>
  );
};

export default Login;
