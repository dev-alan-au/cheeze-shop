import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCart } from '../store/cart-slice';
import { formatPrice } from '../helpers/currency';
import { Product } from '../models/Product';

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { name, description, price } = product;
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  // refactor this
  const decrementQty = () => dispatch({ type: 'cart/decrementItem', payload: { product } });
  const incrementQty = () => dispatch({ type: 'cart/incrementItem', payload: { product } });
  const handleQtyUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(ev.target.value);
    dispatch({ type: 'cart/updateItemQty', payload: { product, qty: newQty } });
  }

  const itemInCart = cart.items.find(item => item.product.id == product.id);

  return (
    <div className="flex gap-2 mb-2">
      <div className="flex-1">{name}</div>
      <div className="flex-1">{description}</div>
      <div className="flex-1">
        <button onClick={decrementQty}>-</button>
        <input type="number" min={0} step={1} value={itemInCart?.qty || 0} onChange={handleQtyUpdate} className="text-center" />
        <button onClick={incrementQty}>+</button>
      </div>
      <div className="flex-1 text-right">{formatPrice(price)}</div>
    </div>
  )
}