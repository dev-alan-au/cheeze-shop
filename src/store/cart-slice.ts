import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Product } from '../models/Product';

type CartLineItem = {
  product: Product;
  qty: number;
}

export type Discount = {
  code: string;
  discountAsPercentage?: number;
  discountAsFixedAmount?: number;
}

export type Cart = {
  items: CartLineItem[];
  discount?: Discount;
}

const emptyCart: Cart = {items: []}

const findItemInCart = (cart: Cart, product: Product) => cart.items.find(item => item.product.id == product.id);

const updateCartItemQty = (cart: Cart, product: Product, qty: number) => {
  const existingItem = findItemInCart(cart, product);

  if(existingItem) {
    if(qty == 0) {
      return {...cart, items: cart.items.filter(item => item.product.id != product.id)};
    }
    return {...cart, items: cart.items.map(item => {
      if(item.product.id == product.id) {
        return {...item, qty: qty > 0 ? qty : 0}
      }
      return item;
    })}
  }
  return ({...cart, items: [...cart.items, {product, qty}]})
}

const incrementCartItemQty = (cart: Cart, product: Product) => {
  const existingItem = findItemInCart(cart, product);
  return updateCartItemQty(cart, product, existingItem ? existingItem.qty + 1 : 1);
}

const decrementCartItemQty = (cart: Cart, product: Product) => {
  const existingItem = findItemInCart(cart, product);
  if(existingItem) {
    return updateCartItemQty(cart, product, existingItem.qty - 1);
  }
  return cart;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: emptyCart,
  reducers: {
    updateItemQty: (state, action: PayloadAction<CartLineItem>) => {
      const { product, qty } = action.payload;
      return updateCartItemQty(state, product, qty);
    },
    addItem: (state, action: PayloadAction<Product>) => {
      return updateCartItemQty(state, action.payload, 1);
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      return updateCartItemQty(state, action.payload, 0);
    },
    incrementItem: (state, action: PayloadAction<Product>) => {
      return incrementCartItemQty(state, action.payload);
    },
    decrementItem: (state, action: PayloadAction<Product>) => {
      return decrementCartItemQty(state, action.payload);
    },
    addDiscount: (state, action: PayloadAction<Discount>) => {
      // validation on server-side during checkout
      return {...state, discount: action.payload };
    },
    removeDiscount: (state) => {
      return {...state, discount: undefined };
    }
  }
});

export const { updateItemQty, addItem, removeItem, decrementItem, incrementItem, addDiscount, removeDiscount } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;