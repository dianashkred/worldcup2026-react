import type { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "./LoginForm";

const LoginSection: FC = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const from = search.get("from") || "/";
  const state = location.state as { message?: string } | null;

  const infoMessage =
    state?.message ||
    (from.includes("/order")
      ? "Please log in to access your cart and buy your ticket."
      : "");

  return (
    <PageContainer>
        <Title>Sign in</Title>
        <LoginForm redirectPath={from} infoMessage={infoMessage} />
    </PageContainer>
  );
};

export default LoginSection;

const PageContainer = styled.main`
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center; 
  background-color: #f4f4f4; 
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #000;
`;