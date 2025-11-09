import React from "react";
import type { FC } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  label: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: boolean; 
  variant?: "default" | "circle" | "step";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ label, to, onClick, style, variant, disabled }) => {
  const navigate = useNavigate();
  const v: "default" | "circle" | "step" = style ? "circle" : (variant ?? "default");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return;
    if (to) navigate(to);
    else if (onClick) onClick(e);
  };

  return (
    <StyledButton onClick={handleClick} $variant={v} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ $variant: "default" | "circle" | "step" }>`
  cursor: pointer;
  border: none;
  font-weight: 400;
  color: #fff;
  background-color: #000;
  font-size: 16px;
  transition: 0.3s;
  letter-spacing: 0.36px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${({ $variant }) =>
    $variant === "circle"
      ? `
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #6095de;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 500;
        padding: 0;
        line-height: 1;
        &:hover { background-color: #4b57db; }
      `
      : $variant === "step"
      ? `
        width: 36px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid #ccc;
        background: #fff;
        color: #000;
        font-size: 20px;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        &:hover { background: #f4f4f4; }
      `
      : `
        width: 140px;
        height: 52px;
        padding: 10px 20px;
        border-radius: 5px;
        &:hover { background-color: #3b3b3b; }
      `}
`;
