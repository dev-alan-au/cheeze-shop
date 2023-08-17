import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './user-slice';
import cartReducer from './cart-slice';

// pass reducer to store
export const store = configureStore({
  reducer: {
    user: usersReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;