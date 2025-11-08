import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
`;

const Form = styled.form`
  background: #111;
  padding: 40px;
  border-radius: 10px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #333;
  border-radius: 6px;
  background: #222;
  color: #fff;
`;

const Button = styled.button`
  background-color: #1c26db;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: #ff5b5b;
  text-align: center;
  font-size: 14px;
`;

export const SignupPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(res)) navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ color: "#fff", textAlign: "center" }}>Sign Up</h2>
        {Object.entries(form).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            type={key === "password" ? "password" : "text"}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={handleChange}
            required
          />
        ))}
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
        <p style={{ color: "#aaa", fontSize: "13px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Form>
    </Container>
  );
};
