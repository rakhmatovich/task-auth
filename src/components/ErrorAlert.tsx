import React from "react";
import { Alert } from "antd";

type ErrorAlertProps = {
  message: string;
  onClose?: () => void;
  showIcon?: boolean;
  closable?: boolean;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onClose,
  showIcon = true,
  closable = false,
}) => (
  <Alert
    description={message}
    type="error"
    showIcon={showIcon}
    closable={closable}
    onClose={onClose}
    style={{ marginBottom: 16, width: "100%" }}
  />
);

export default ErrorAlert;
