import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { createLoginSchema } from "../utils/authValidation";
import type { LoginFormDataType } from "../types/auth";

export const useLoginForm = () => {
  const schema = useMemo(() => createLoginSchema(), []);

  const form = useForm<LoginFormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { errors, isValid, isDirty } = form.formState;

  const isSubmitDisabled = !isValid || !isDirty;

  return {
    ...form,
    errors,
    isValid,
    isDirty,
    isSubmitDisabled,
  };
};
