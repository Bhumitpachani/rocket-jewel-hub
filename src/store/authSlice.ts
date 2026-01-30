import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredentials } from './types';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserCredentials | null;
  users: UserCredentials[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  users: [
    // Super Admin - hardcoded for demo
    {
      id: 'admin-1',
      username: 'admin',
      password: '123',
      role: 'super_admin'
    },
    // Jeweler Admins - managed by super admin
    {
      id: 'jeweler-1',
      username: 'diamond_palace',
      password: 'diamond123',
      role: 'jeweler_admin',
      jewelerShopId: '1'
    },
    {
      id: 'jeweler-2',
      username: 'crown_jewelers',
      password: 'crown123',
      role: 'jeweler_admin',
      jewelerShopId: '2'
    }
  ]
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        u => u.username === username && u.password === password
      );
      
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    addJewelerCredentials: (state, action: PayloadAction<Omit<UserCredentials, 'id' | 'role'>>) => {
      const newUser: UserCredentials = {
        id: `jeweler-${Date.now()}`,
        ...action.payload,
        role: 'jeweler_admin'
      };
      state.users.push(newUser);
    },
    updateJewelerCredentials: (state, action: PayloadAction<{ id: string; username: string; password: string }>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index].username = action.payload.username;
        state.users[index].password = action.payload.password;
      }
    },
    deleteJewelerCredentials: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    }
  }
});

export const {
  login,
  logout,
  addJewelerCredentials,
  updateJewelerCredentials,
  deleteJewelerCredentials
} = authSlice.actions;

export default authSlice.reducer;
