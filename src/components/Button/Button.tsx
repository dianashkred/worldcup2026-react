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
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledButton onClick={handleClick} className={!style ? 'circleStyle' : ''}>
      {label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
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
  
  &:circleStyle {
    background-color: #6095deff;
    color: #ffffff;

    &:hover {
      background-color: #4b57dbff;
    }
`;
