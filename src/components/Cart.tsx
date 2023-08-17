import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCart } from '../store/cart-slice';
import { Product } from '../models/Product';
import { formatPrice } from '../helpers/currency';
import { Cart } from '../store/cart-slice';

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

function CartItem({ product, qty }: { product: Product, qty: number }) {
  const dispatch = useAppDispatch();
  const { name, price } = product;

  // TODO: refactor this
  const removeItem = () => dispatch({ type: 'cart/removeItem', payload: { product } });
  const decrementQty = () => dispatch({ type: 'cart/decrementItem', payload: { product } });
  const incrementQty = () => dispatch({ type: 'cart/incrementItem', payload: { product } });

  return (
    <div className="flex">
      <div className="flex-1">{name}</div>
      <div className="flex-1"><button onClick={decrementQty}>-</button>{qty}<button onClick={incrementQty}>+</button></div>
      <div className="flex-auto text-right">{formatPrice(price * qty)}</div>
      <div className="flex-auto text-right"><button onClick={removeItem}>Remove</button></div>
    </div>
  )
}