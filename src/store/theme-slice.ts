import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type Theme = 'light' | 'dark';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: () => localStorage.getItem('theme') == 'dark' ? 'dark' : 'light' as Theme,
  reducers: {
    updateTheme: (_, action: PayloadAction<Theme>) => action.payload,
  }
});

export const { updateTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
export default themeSlice.reducer;