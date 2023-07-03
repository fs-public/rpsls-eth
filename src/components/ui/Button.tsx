import React from "react";
import { Icon } from "@iconify/react";
import { styled } from "styled-components";

type ButtonVariant = "solid" | "ghost";

const StyledButton = styled.button<{ $variant: ButtonVariant; disabled?: boolean; $overrideColor?: string }>`
  width: 100%;
  min-width: 150px;
  max-width: 200px;

  @media (max-width: 640px) {
    min-width: 100px;
    max-width: 150px;
  }

  padding: 16px 12px;
  border-radius: 8px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-family: inherit;
  border: none;
  outline: none;
  cursor: pointer;

  background-color: ${(props) => props.$overrideColor || (props.$variant === "solid" ? "#4987eb" : "transparent")};
  font-weight: 700;

  &:hover:not(:active) {
    background-color: ${(props) => (props.$variant === "solid" ? "#2665c9" : "#aaaaaa60")};
  }

  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  overrideColor?: string;
  icon?: string;
  pending?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text, variant, disabled, overrideColor, icon, pending, onClick }) => {
  return (
    <StyledButton
      $variant={variant || "solid"}
      disabled={disabled || pending}
      $overrideColor={overrideColor}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} style={{ width: "16px" }} />}
      {pending && <Icon icon="ant-design:loading-outlined" className="rotating" style={{ width: "16px" }} />}
      {text}
    </StyledButton>
  );
};

export default Button;
