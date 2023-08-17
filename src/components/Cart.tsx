import { useAppSelector } from '../hooks';
import { Cart, selectCart } from '../store/cart-slice';
import { formatPrice } from '../helpers/currency';
import CartItem from './CartItem';
import CartDiscount from './CartDiscount';

function calculateSubTotal(cart: Cart) {
  if (!cart.items.length) return 0;

  return cart.items.reduce((subtotal: number, currentCartItem) => {
    const { product, qty } = currentCartItem;
    return subtotal + qty * product.price;
  }, 0);
}

function applyDiscount(cart: Cart) {
  return function (subtotal: number) {
    if (!cart.discount) return subtotal;

    const { discountAsFixedAmount, discountAsPercentage } = cart.discount;
    if (discountAsFixedAmount) return subtotal - discountAsFixedAmount;
    if (discountAsPercentage) return subtotal * (1 - discountAsPercentage);

    console.error('Discount code error', cart.discount);
    return subtotal; // something isn't valid
  }
}

export default function Cart() {
  const cart = useAppSelector(selectCart);
  if (!cart.items.length) return <p>No items in cart.</p>

  return (
    <>
      <p>Cart</p>
      {cart.items.map(item => <CartItem key={item.product.id} product={item.product} qty={item.qty} />)}
      <CartDiscount />
      <div>Total: {
        formatPrice(applyDiscount(cart)(calculateSubTotal(cart))) //currying for fun
      }</div>
    </>
  )
}