import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../features/store";
import { getProfile, selectAuth, signin } from "../../features/auth/authSlice";
import Button from "../Button/Button";

type Props = {
  redirectPath: string;
  infoMessage?: string;
};

const LoginForm: FC<Props> = ({ redirectPath, infoMessage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(selectAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(redirectPath || "/", { replace: true });
    }
  }, [isAuthenticated, user, redirectPath, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setLocalError("Please provide both email and password.");
      return;
    }

    const result = await dispatch(
      signin({ email: trimmedEmail, password: trimmedPassword })
    );

    if (signin.fulfilled.match(result)) {
      await dispatch(getProfile());
      navigate(redirectPath || "/", { replace: true });
    } else if (signin.rejected.match(result) && result.payload) {
      setLocalError(String(result.payload));
    } else {
      setLocalError("Unable to sign in. Please try again.");
    }
  };

  return (
    <FormContainer>

      {infoMessage && <InfoBox>{infoMessage}</InfoBox>}
      {localError && <ErrorBox>{localError}</ErrorBox>}
      {error && !localError && <ErrorBox>{error}</ErrorBox>}

      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </Field>

        <SignUpText>
          Don’t have an account? <a href="/signup">Create one</a>
        </SignUpText>

        <ButtonRow>
          <Button
            label={loading ? "Signing in..." : "Sign in"}
            onClick={handleSubmit}
          />
        </ButtonRow>
      </StyledForm>
    </FormContainer>
  );
};

export default LoginForm;



const FormContainer = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 32px 28px;
  border-radius: 12px;
  background-color: #e0e0e0; 
  color: #000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #111;
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 0.7rem 0.85rem;
  font-size: 0.98rem;
  background-color: #ffffff;
  color: #000;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #1c26dbff;
    box-shadow: 0 0 0 1px rgba(28, 38, 219, 0.25);
  }
`;

const ButtonRow = styled.div`
  margin-top: 1.4rem;
  display: flex;
  justify-content: center;
`;

const InfoBox = styled.div`
  background-color: #f4f4f4;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: #333;
  border: 1px solid #d4d4d4;
`;

const ErrorBox = styled.div`
  background-color: #c53030;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: #fff;
`;
const SignUpText = styled.div`
  margin-top: 1rem;
  text-align: center;

  a {
    color: #1c26dbff;
    text-decoration: underline;
  }
`;

