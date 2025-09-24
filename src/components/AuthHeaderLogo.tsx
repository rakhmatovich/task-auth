import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  showBackButton?: boolean;
};

export default function AuthHeaderLogo({ showBackButton = false }: Props) {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: 376, height: 64, position: "relative" }}
    >
      {showBackButton && (
        <Button
          type="text"
          size="large"
          style={{ position: "absolute", left: 0, top: 0 }}
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
        />
      )}
      <img src="/logo.svg" />
    </Flex>
  );
}
