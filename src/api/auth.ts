import type { AuthResponse } from "../types/auth";

type LoginData = { email: string; password: string };

export const login = async ({ email, password }: LoginData) => {
  return new Promise<AuthResponse>((resolve, reject) => {
    setTimeout(() => {
      if (!email.includes("@")) {
        reject({ message: "Incorrect email" });
      } else if (password.length < 6) {
        reject({ message: "Password is too short" });
      } else if (email === "test@test.com" && password === "password") {
        resolve({
          token: "fake-jwt-token",
          requiresTwoFactor: true,
          user: { id: 1, email: "test@test.com" },
        });
      } else {
        reject({ message: "Incorrect login or password" });
      }
    }, 1000);
  });
};

export const verifyTwoFactor = async ({ code }: { code: string }) => {
  return new Promise<{ success: boolean }>((resolve, reject) => {
    setTimeout(() => {
      if (code.length !== 6 || /\D/.test(code)) {
        reject({ message: "Invalid code" });
      } else if (code === "123456") {
        resolve({ success: true });
      } else {
        reject({ message: "Incorrect code" });
      }
    }, 800);
  });
};

export const resendTwoFactorCode = async () => {
  return new Promise<{ resent: boolean }>((resolve) => {
    setTimeout(() => resolve({ resent: true }), 600);
  });
};
