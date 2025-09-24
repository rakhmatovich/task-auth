import * as yup from "yup";

export const createLoginSchema = () => {
  return yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .trim(),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
};
