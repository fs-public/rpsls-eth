export const formatMinutes = (difference?: number) => {
  if (difference === undefined) return "...";
  if (difference < 0) return "0:00";

  const secondsLeft = String(difference % 60);
  const formattedSeconds = secondsLeft.length === 1 ? `0${secondsLeft}` : secondsLeft;

  return `${Math.floor(difference / 60)}:${formattedSeconds}`;
};

export const pastActionString = (diff: number) => {
  // Returns time difference as strings like '5 mins ago', '1 day ago'

  const format = (divisor: number, unit: string) => {
    const length = Math.round(diff / divisor);
    const plural = length >= 2 ? "s" : "";
    return `${length} ${unit}${plural} ago`;
  };

  if (diff > 86400) return format(86400, "day");
  else if (diff > 3600) return format(3600, "hour");
  else if (diff > 60) return format(60, "min");
  else return "A few secs ago";
};
