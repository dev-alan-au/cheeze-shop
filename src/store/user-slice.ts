import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type User = {
  authorised: boolean;
  name?: string;
  email?: string;
}

type LoginCredentials = {
  username: string;
  password: string;
}

const unauthorisedUser: User = {authorised: false, name: undefined, email: undefined};

const mockLogin = (username: string, password: string) => {
  if(username == 'ted' && password == 'password') return {name: 'Ted', email: 'ted@email.com'};
  return null;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: unauthorisedUser,
  reducers: {
    login: (_, action: PayloadAction<LoginCredentials>) => {
      const { username, password } = action.payload;
      const user = mockLogin(username, password);
      if(user) {
        return {
          authorised: true,
          name: user.name,
          email: user.email,
        }
      } else return unauthorisedUser;
    },
    logout: () => unauthorisedUser,
  },
})

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;