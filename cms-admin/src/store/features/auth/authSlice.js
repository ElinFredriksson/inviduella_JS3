import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
const initialState = {
  admin: null,
  loading: false,
  error: null,
  authIsReady: false,
};
export const registerAdminUser = createAsyncThunk(
  'auth/registerAdmin',
  async (formData, thunkAPI) => {
    try {
      const { email, password } = formData;
      return await authService.registerAdmin(email, password);
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
export const loginAdminUser = createAsyncThunk(
  'auth/loginAdmin',
  async (formData, thunkAPI) => {
    try {
      const { email, password } = formData;
      return await authService.loginAdmin(email, password);
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
export const signInWithGoogle = createAsyncThunk(
  'auth/googleLogin',
  async (_, thunkAPI) => {
    try {
      return await authService.signInWithGoogle();
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
export const logoutAdmin = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await authService.logout();
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    authReady: (state, action) => {
      state.admin = action.payload;
      state.authIsReady = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // registerAdmin
      .addCase(registerAdminUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAdminUser.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // loginAdmin
      .addCase(loginAdminUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdminUser.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // signInWithGoogle
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // logoutAdmin
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
      });
  },
});
export const { setError, authReady } = authSlice.actions;
export default authSlice.reducer;
