import * as yup from "yup";

export const createTwoFactorSchema = (length: number = 6) => {
  return yup
    .array()
    .of(
      yup
        .string()
        .required("Required")
        .matches(/^[0-9]$/, "Must be a digit")
    )
    .min(length, `Code must be ${length} digits`)
    .max(length, `Code must be ${length} digits`);
};
