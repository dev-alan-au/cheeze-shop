import { useAppDispatch } from '../hooks';
import { Product } from '../models/Product';
import { formatPrice } from '../helpers/currency';

interface CartItemProps {
  product: Product;
  qty: number;
}

export default function CartItem({ product, qty }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { name, price } = product;

  // TODO: refactor this
  const removeItem = () => dispatch({ type: 'cart/removeItem', payload: { product } });
  const decrementQty = () => dispatch({ type: 'cart/decrementItem', payload: { product } });
  const incrementQty = () => dispatch({ type: 'cart/incrementItem', payload: { product } });
  const handleQtyUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(ev.target.value);
    dispatch({ type: 'cart/updateItemQty', payload: { product, qty: newQty } });
  }

  return (
    <div className="flex">
      <div className="flex-1">{name}</div>
      <div className="flex-1">
        <button onClick={decrementQty}>-</button>
        <input type="number" min={0} step={1} value={qty} onChange={handleQtyUpdate} className="text-center" />
        <button onClick={incrementQty}>+</button>
      </div>
      <div className="flex-auto text-right">{formatPrice(price * qty)}</div>
      <div className="flex-auto text-right"><button onClick={removeItem}>Remove</button></div>
    </div>
  )
}