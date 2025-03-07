import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  return localStorage.getItem("isAuthenticated") || null;
};

const saveAuthToStorage = (isAuthenticated) => {
  localStorage.setItem("isAuthenticated", isAuthenticated);
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: loadAuthFromStorage(),
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      saveAuthToStorage(true);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      saveAuthToStorage(false);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
