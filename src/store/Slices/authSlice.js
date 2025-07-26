// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('setUser payload:', action.payload);
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
