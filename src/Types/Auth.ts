export type AuthResponse = {
  success: boolean;
  data: {
    access_token: string;
  };
}

export type UserProfile = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  createdAt: string;
}
