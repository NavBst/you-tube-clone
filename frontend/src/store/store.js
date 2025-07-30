import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';  // Add .js extension

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
