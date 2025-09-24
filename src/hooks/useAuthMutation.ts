import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { login as loginRequest } from "../api/auth.ts";

import {
  storeAuthToken,
  AUTH_ROUTES,
  formatErrorMessage,
} from "../utils/authHelpers";
import type { LoginFormDataType, AuthResponse } from "../types/auth";

export const useAuthMutation = () => {
  const navigate = useNavigate();

  const mutation = useMutation<AuthResponse, Error, LoginFormDataType>({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      handleAuthSuccess(response);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleAuthSuccess = useCallback(
    (response: AuthResponse) => {
      if (response.token) {
        storeAuthToken(response.token);

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        navigate(AUTH_ROUTES.TWO_FACTOR);
      }
    },
    [navigate]
  );

  const login = useCallback(
    async (data: LoginFormDataType) => {
      return mutation.mutateAsync(data);
    },
    [mutation]
  );

  const errorMessage = mutation.error
    ? formatErrorMessage(mutation.error)
    : null;

  return {
    login,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    errorMessage,
    reset: mutation.reset,
  };
};
