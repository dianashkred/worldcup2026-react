import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


interface ButtonProps {
  label: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
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
    <StyledButton onClick={handleClick} $circle={!style}>
      {label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ $circle?: boolean }>`
  width: 140px;
  height: 52px;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color: white;
  transition: background-color 0.3s;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.36px;

  &:hover {
    background-color: #3b3b3bff;
  }
  
  ${({ $circle }) =>
    $circle &&
    css`
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: #6095de;
      font-size: 24px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
      color: #ffffff;

    &:hover {
      background-color: #4b57dbff;
    `}
`;
