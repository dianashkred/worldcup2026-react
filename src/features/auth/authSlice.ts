import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signup, getProfile, clearToken } from "../../api/auth";
import type { UserProfile } from "../../Types/Auth";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("access_token"),
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: Parameters<typeof signup>[0], { rejectWithValue }) => {
    try {
      const token = await signup(userData);
      const profile = await getProfile();
      return { token, user: profile };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: Parameters<typeof signin>[0], { rejectWithValue }) => {
    try {
      const token = await signin(credentials);
      const profile = await getProfile();
      return { token, user: profile };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const profile = await getProfile();
    return profile;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.user = a.payload.user;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.user = a.payload.user;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.user = a.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
