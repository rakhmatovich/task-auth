import React, { type ClipboardEvent, type FC, type KeyboardEvent } from "react";
import { Flex, Form, Typography, type InputRef } from "antd";
import DigitInput from "./DigitInput";
import { CODE_LENGTH } from "../utils/twoFactorHelpers";

const { Text } = Typography;

type TwoFactorInputGroupProps = {
  code: string[];
  errors: string[];
  inputsRef: React.MutableRefObject<(InputRef | null)[]>;
  isPending: boolean;
  serverCodeInvalid: boolean;
  handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  handleInputChange: (value: string, index: number) => string;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
};

const TwoFactorInputGroup: FC<TwoFactorInputGroupProps> = ({
  code,
  errors,
  inputsRef,
  isPending,
  serverCodeInvalid,
  handlePaste,
  handleInputChange,
  handleKeyDown,
}) => (
  <Form.Item>
    <Flex justify="space-between" align="center" gap={8}>
      {Array.from({ length: CODE_LENGTH }, (_, index) => (
        <DigitInput
          key={index}
          value={code[index] || ""}
          onChange={(value) => handleInputChange(value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={isPending}
          error={!!errors[index] || serverCodeInvalid}
          inputRef={(el) => {
            inputsRef.current[index] = el;
          }}
        />
      ))}
    </Flex>

    {serverCodeInvalid && (
      <Text type="danger" style={{ display: "block", marginTop: 8 }}>
        Invalid code
      </Text>
    )}

    {errors.some((error) => error) && (
      <Text type="danger" style={{ display: "block", marginTop: 4 }}>
        {errors.find((error) => error) || "Please enter valid digits"}
      </Text>
    )}
  </Form.Item>
);

export default TwoFactorInputGroup;
