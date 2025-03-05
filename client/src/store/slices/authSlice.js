import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  company: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, company, token } = action.payload;
      state.user = user;
      state.company = company;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.company = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
