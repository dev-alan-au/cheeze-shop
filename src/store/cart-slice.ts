import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type Product = {
  id: string;
  name: string;
  price: number;
}

type CartLineItem = {
  product: Product;
  qty: number;
}

export type Cart = {
  items: CartLineItem[],
  discountCode?: string,
}

const emptyCart: Cart = {items: []}

const updateCartItemQty = (cart: Cart, product: Product, qty: number) => {
  const hasExistingItem = cart.items.find(item => item.product.id == product.id);

  if(hasExistingItem) {
    return {...cart, items: cart.items.map(item => {
      if(item.product.id == product.id) {
        return {...item, qty: item.qty + qty}
      }
      return item;
    })}
  }
  return ({...cart, items: [...cart.items, {product, qty}]})
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: emptyCart,
  reducers: {
    updateItemQty: (state, action: PayloadAction<CartLineItem>) => {
      const { product, qty } = action.payload;
      updateCartItemQty(state, product, qty);
    },
    addItem: (state, action: PayloadAction<CartLineItem>) => {
      const { product } = action.payload;
      updateCartItemQty(state, product, 1);
    },
    removeItem: (state, action: PayloadAction<CartLineItem>) => {
      const { product } = action.payload;
      updateCartItemQty(state, product, 0);
    },
  }
});

export const { updateItemQty, addItem, removeItem } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;