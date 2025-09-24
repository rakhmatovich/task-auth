import React from "react";
import { Button, Form, Typography } from "antd";

const { Text } = Typography;

type TwoFactorActionsProps = {
  anyTyped: boolean;
  isComplete: boolean;
  isPending: boolean;
  isSuccess: boolean;
  serverCodeInvalid: boolean;
  isCountdownExpired: boolean;
  formattedTime: string;
  onResendCode: () => void;
};

const TwoFactorActions: React.FC<TwoFactorActionsProps> = ({
  anyTyped,
  isComplete,
  isPending,
  isSuccess,
  serverCodeInvalid,
  isCountdownExpired,
  formattedTime,
  onResendCode,
}) => {
  if (isSuccess) {
    return (
      <Text
        type="success"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        You have successfully completed the authorization 🎉
      </Text>
    );
  }

  if (anyTyped) {
    return (
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          size="large"
          loading={isPending}
          disabled={!isComplete || serverCodeInvalid}
        >
          {isPending ? "Verifying..." : "Continue"}
        </Button>
      </Form.Item>
    );
  }

  if (isCountdownExpired) {
    return (
      <Form.Item>
        <Button
          block
          type="primary"
          size="large"
          onClick={onResendCode}
          disabled={isPending}
        >
          Get new code
        </Button>
      </Form.Item>
    );
  }

  return (
    <Text
      type="secondary"
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        fontSize: 14,
      }}
    >
      Get a new code in {formattedTime}
    </Text>
  );
};

export default TwoFactorActions;
