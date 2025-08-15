// Redux slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  profile: any;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.profile = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      localStorage.removeItem('token');
    },
  },
});