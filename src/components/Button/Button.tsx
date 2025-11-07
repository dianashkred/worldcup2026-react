import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


interface ButtonProps {
  label: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: boolean;
}


const Button: FC<ButtonProps> = ({ label, to, onClick, style }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledButton onClick={handleClick} $circle={style}>
      {label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ $circle?: boolean }>`
  cursor: pointer;
  border: none;
  font-weight: 400;
  color: #fff;
  background-color: #000;
  font-size: 16px;
  transition: 0.3s;
  letter-spacing: 0.36px;

  ${({ $circle }) =>
    $circle
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
      &:hover {
        background-color: #4b57db;
      }
    `
      : `
      width: 140px;
      height: 52px;
      padding: 10px 20px;
      border-radius: 5px;
      &:hover {
        background-color: #3b3b3b;
      }
    `}
`;

