import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

// Helper function to safely parse JSON
const safeJSONParse = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch (e) {
    return null;
  }
};

// Initial state
const initialState = {
  user: safeJSONParse(localStorage.getItem('user')),
  channel: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.error = null;
      state.channel = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updatechannel: (state, action) =>{
      console.log(action.payload)
      state.channel = action.payload
    },
    load: (state, action)=>{
      state.loading = action.payload.loading;
    }
   
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, clearError, updatechannel, load } = slice.actions;

const authReducer = slice.reducer;
export default authReducer;
