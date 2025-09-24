import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Flex, Form, Typography } from "antd";
import AuthLayout from "../components/AuthLayout";
import AuthHeaderLogo from "../components/AuthHeaderLogo";
import TwoFactorActions from "../components/TwoFactorActions";
import TwoFactorInputGroup from "../components/TwoFactorInputGroup";
import { verifyTwoFactor } from "../api/auth";
import { useCountdown } from "../hooks/useCountdown";
import { useTwoFactorForm } from "../hooks/useTwoFactorForm";
import { useTwoFactorInputs } from "../hooks/useTwoFactorInputs";
import { codeArrayToString } from "../utils/twoFactorHelpers";

const { Title, Text } = Typography;

const TwoStepAuth: React.FC = () => {
  const [serverCodeInvalid, setServerCodeInvalid] = useState(false);

  const {
    code,
    errors,
    updateDigit,
    setCodeFromArray,
    anyTyped,
    isComplete,
    codeString,
  } = useTwoFactorForm();

  const { formattedTime, reset: resetCountdown, isExpired } = useCountdown(60);

  const clearServerError = useCallback(() => {
    setServerCodeInvalid(false);
  }, []);

  const {
    inputsRef,
    handlePaste,
    handleInputChange,
    handleKeyDown,
    focusFirstInput,
    clearAllInputs,
  } = useTwoFactorInputs(code, updateDigit, setCodeFromArray, clearServerError);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: verifyTwoFactor,
    onError: () => {
      setServerCodeInvalid(true);
    },
    onSuccess: () => {
      console.log("Two-factor authentication successful");
    },
  });

  const onSubmit = useCallback(() => {
    if (!isComplete || serverCodeInvalid) {
      return;
    }

    const code = codeArrayToString(codeString.split(""));
    mutate({ code });
  }, [isComplete, serverCodeInvalid, codeString, mutate]);

  const handleResendCode = useCallback(() => {
    resetCountdown();
    clearAllInputs();
    setServerCodeInvalid(false);

    // Focus first input after clearing
    setTimeout(() => {
      focusFirstInput();
    }, 0);
  }, [resetCountdown, clearAllInputs, focusFirstInput]);

  return (
    <AuthLayout>
      <Flex
        vertical
        justify="center"
        align="center"
        gap={24}
        style={{
          width: 440,
          backgroundColor: "#FFFFFF",
          padding: 32,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <AuthHeaderLogo showBackButton />

          <Title
            level={3}
            style={{
              textAlign: "center",
              fontWeight: 600,
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            Two-Factor Authentication
          </Title>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            Enter the 6-digit code from your <br />
            Google Authenticator app
          </Text>
        </div>

        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onSubmit}
          noValidate
        >
          <TwoFactorInputGroup
            code={code}
            errors={errors}
            inputsRef={inputsRef}
            isPending={isPending}
            serverCodeInvalid={serverCodeInvalid}
            handlePaste={handlePaste}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
          />

          <TwoFactorActions
            anyTyped={anyTyped}
            isComplete={isComplete}
            isPending={isPending}
            isSuccess={isSuccess}
            serverCodeInvalid={serverCodeInvalid}
            isCountdownExpired={isExpired}
            formattedTime={formattedTime}
            onResendCode={handleResendCode}
          />
        </Form>
      </Flex>
    </AuthLayout>
  );
};

export default TwoStepAuth;
