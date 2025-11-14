import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  signinRequest,
  signupRequest,
  getProfileRequest,
} from "../../services/api/authService";
import { loadToken, clearToken, saveToken } from "../../utils/secureStorage";

export type AuthUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: loadToken(),
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!loadToken(),
};

// LOGIN
export const signin = createAsyncThunk<
  string, // возвращаем token
  { email: string; password: string },
  { rejectValue: string }
>("auth/signin", async ({ email, password }, thunkApi) => {
  try {
    const res = await signinRequest(email, password);

    if (!res.success) {
      return thunkApi.rejectWithValue("Invalid credentials");
    }

    const token = res.data.access_token;
    saveToken(token);

    return token;
  } catch {
    return thunkApi.rejectWithValue("Invalid credentials");
  }
});

// SIGNUP
export const signup = createAsyncThunk<
  string, 
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

    const token = res.data.access_token;
    saveToken(token);

    return token;
  } catch {
    return thunkApi.rejectWithValue("Signup failed");
  }
});


// PROFILE
export const getProfile = createAsyncThunk<
  AuthUser,
  void,
  { state: RootState; rejectValue: string }
>("auth/getProfile", async (_, thunkApi) => {
  try {
    const res = await getProfileRequest();

    if (!res.success) {
      return thunkApi.rejectWithValue("Failed to load profile");
    }

    return res.data;
  } catch {
    return thunkApi.rejectWithValue("Failed to load profile");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      clearToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Invalid credentials";
    });

    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Signup failed";
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
