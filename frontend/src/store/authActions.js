import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', credentials);
      const data = response.data;
      console.log(data);
      if (data.status === true) {
        // Store token in localStorage
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { user: data.user, token: data.accessToken };
      }
      return rejectWithValue(data.message || 'Login failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || error.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/register', userData);
      const data = response.data;
      if (data.status === true) {
        // Store token and user data after successful registration
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { user: data.user, token: data.accessToken };
      }
      return rejectWithValue(data.error?.message || 'Registration failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || error.message || 'Registration failed');
    }
  }
);
