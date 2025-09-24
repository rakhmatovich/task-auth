import { useState, useEffect, useMemo, useCallback } from "react";
import { formatSecondsToMMSS } from "../utils/twoFactorHelpers";

export const useCountdown = (initialSeconds: number = 60) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const formattedTime = useMemo(
    () => formatSecondsToMMSS(secondsLeft),
    [secondsLeft]
  );

  const reset = useCallback(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const isExpired = useMemo(() => secondsLeft <= 0, [secondsLeft]);

  return {
    secondsLeft,
    formattedTime,
    reset,
    isExpired,
  };
};
