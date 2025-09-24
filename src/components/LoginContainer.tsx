import React from "react";
import { Flex } from "antd";

type LoginContainerProps = {
  children: React.ReactNode;
};

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => (
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
    {children}
  </Flex>
);

export default LoginContainer;
