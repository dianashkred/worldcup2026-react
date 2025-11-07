export interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
  };
}

export interface UserProfile {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  createdAt: string;
}
