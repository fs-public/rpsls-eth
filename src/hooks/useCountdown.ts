import { useEffect, useState } from "react";

const useCountdown = (end?: number): number | undefined => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!end) return;

    const interval = setInterval(() => {
      const difference = end - Math.round(Date.now() / 1000);
      setTimeLeft(difference < 0 ? 0 : difference);
    }, 1000);

    return () => clearInterval(interval);
  }, [end]);

  return timeLeft;
};

export default useCountdown;
