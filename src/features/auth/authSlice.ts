import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  signinRequest,
  signupRequest,
  getProfileRequest,
} from "../../services/api/authService";

export type AuthUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// LOGIN
export const signin = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signin", async ({ email, password }, thunkApi) => {
  try {
    const res = await signinRequest(email, password);

    if (!res.success) {
      return thunkApi.rejectWithValue("Invalid credentials");
    }
    return;
  } catch {
    return thunkApi.rejectWithValue("Invalid credentials");
  }
});

// SIGNUP
export const signup = createAsyncThunk<
  void,
  {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthDate: string;
  },
  { rejectValue: string }
>("auth/signup", async (payload, thunkApi) => {
  try {
    const res = await signupRequest(payload);

    if (!res.success) {
      return thunkApi.rejectWithValue("Signup failed");
    }

    return;
  } catch {
    return thunkApi.rejectWithValue("Signup failed");
  }
});

// PROFILE
export const getProfile = createAsyncThunk<
  AuthUser,
  void,
  { rejectValue: string }
>("auth/getProfile", async (_, thunkApi) => {
  try {
    const res = await getProfileRequest();

    if (!res.success) {
      return thunkApi.rejectWithValue("Not authenticated");
    }

    return res.data;
  } catch {
    return thunkApi.rejectWithValue("Not authenticated");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Invalid credentials";
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
