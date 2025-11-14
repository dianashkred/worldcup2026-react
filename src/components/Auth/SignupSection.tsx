import type { FC } from "react";
import styled from "styled-components";
import SignupForm from "./SignupForm";

const SignupSection: FC = () => {
  return (
    <PageContainer>
        <Title>Sign up</Title>
        <SignupForm />
    </PageContainer>
  );
};

export default SignupSection;

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center; 
  background-color: #f4f4f4; 
  margin-top: 60px;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #000;
`;
