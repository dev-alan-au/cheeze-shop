import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const asideSlice = createSlice({
  name: 'aside',
  initialState: false,
  reducers: {
    setVisibility: (_, action: PayloadAction<boolean>) => action.payload,
    toggleVisibility: (state) => !state,
  }
});

export const { setVisibility, toggleVisibility } = asideSlice.actions;
export const selectAside = (state: RootState) => state.aside;
export default asideSlice.reducer;