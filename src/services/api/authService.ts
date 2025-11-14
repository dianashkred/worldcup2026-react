import type { AuthResponse } from "../../Types/Auth";

const BASE_URL = "https://worldcup2026.shrp.dev";

// SIGNUP
export async function signupRequest(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthDate: string; 
}): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Signup failed");
  }

  return (await res.json()) as AuthResponse;
}

// LOGIN
export async function signinRequest(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    credentials: "include",  
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return { success: res.ok, data };
}


export const getProfileRequest = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",  
  });
  return res.json();
};
