import React from "react";
import { Typography } from "antd";
import AuthHeader from "./AuthHeaderLogo";

const { Title, Text } = Typography;

const TwoFactorHeader: React.FC = () => (
  <div>
    <AuthHeader showBackButton />
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
);

export default TwoFactorHeader;
