import { useAppSelector } from '../hooks';
import { selectCart } from '../store/cart-slice';
import { formatPrice } from '../helpers/currency';
import { Cart } from '../store/cart-slice';
import CartItem from './CartItem'

function calculateTotal(cart: Cart) {
  if (!cart.items.length) return 0;

  return formatPrice(cart.items.reduce((subtotal: number, currentCartItem) => {
    const { product, qty } = currentCartItem;
    return subtotal + qty * product.price;
  }, 0));
}

export default function Cart() {
  const cart = useAppSelector(selectCart);

  if (!cart.items.length) return <p>No items in cart.</p>

  return (
    <>
      <p>Cart</p>
      {cart.items.map(item => <CartItem key={item.product.id} product={item.product} qty={item.qty} />)}
      <div>Total: {calculateTotal(cart)}</div>
    </>
  )
}