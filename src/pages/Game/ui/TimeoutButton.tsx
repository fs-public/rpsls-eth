import React from "react";
import Button from "src/components/ui/Button";
import { TIMEOUT_IS_CLOSE } from "src/config/constants";
import { formatMinutes } from "src/utils/date";

interface TimeoutButtonProps {
  timeLeft?: number;
  clickable?: boolean;
  pending?: boolean;
  onClick?: () => void;
}

const TimeoutButton: React.FC<TimeoutButtonProps> = ({ timeLeft, clickable, pending, onClick }) => {
  if ((timeLeft !== undefined && timeLeft > 0) || !clickable)
    return (
      <Button
        text={formatMinutes(timeLeft)}
        disabled={true}
        overrideColor={timeLeft !== undefined && timeLeft < TIMEOUT_IS_CLOSE ? "maroon" : undefined}
      />
    );

  return (
    <Button
      text="Timeout"
      onClick={onClick}
      disabled={timeLeft === undefined}
      pending={pending}
      overrideColor={timeLeft !== undefined && timeLeft <= 0 ? "maroon" : undefined}
    />
  );
};

export default TimeoutButton;
