import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "src/components/ui/Button";

const PlayAgainButton: React.FC = () => {
  const navigate = useNavigate();

  return <Button text="Play again?" onClick={() => navigate("/")} />;
};

export default PlayAgainButton;
