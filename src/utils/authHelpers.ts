export const AUTH_ROUTES = {
  LOGIN: "/login",
  TWO_FACTOR: "/two-factor",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
} as const;

export const storeAuthToken = (token: string, remember: boolean = false) => {
  if (remember) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }
};

export const getAuthToken = (): string | null => {
  return (
    localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ||
    sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  );
};

export const clearAuthToken = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

export const formatErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "An unexpected error occurred. Please try again.";
};
