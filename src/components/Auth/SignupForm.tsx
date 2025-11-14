import type { FC, FormEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signup, selectAuth } from "../../features/auth/authSlice";
import type { AppDispatch } from "../../features/store";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const SignupForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const update = (key: string, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)) {
      alert("Birth date must be in format YYYY-MM-DD");
      return;
    }

    const result = await dispatch(signup(form));

    if (signup.fulfilled.match(result)) {
      navigate("/login?registered=1");
    }
  };

  return (
    <FormContainer>

      {error && <ErrorBox>{error}</ErrorBox>}

      <StyledForm onSubmit={handleSubmit}>

        <Field>
          <Label>First name</Label>
          <Input
            value={form.firstname}
            required
            onChange={(e) => update("firstname", e.target.value)}
          />
        </Field>

        <Field>
          <Label>Last name</Label>
          <Input
            value={form.lastname}
            required
            onChange={(e) => update("lastname", e.target.value)}
          />
        </Field>

        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            required
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>

        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            required
            onChange={(e) => update("password", e.target.value)}
          />
        </Field>

        <Field>
          <Label>Birth date (YYYY-MM-DD)</Label>
          <Input
            type="text"
            placeholder="YYYY-MM-DD"
            value={form.birthDate}
            required
            onChange={(e) => {
              const val = e.target.value;

              if (/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(val)) {
                update("birthDate", val);
              }
            }}
          />
        </Field>

        <ButtonRow>
          <Button
            label={loading ? "Creating..." : "Sign up"}
            onClick={() => {}}
          />
        </ButtonRow>
      </StyledForm>
    </FormContainer>
  );
};

export default SignupForm;


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
  font-size: 1rem;
  background: #fff;
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

const ErrorBox = styled.div`
  background-color: #c53030;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: #fff;
`;



