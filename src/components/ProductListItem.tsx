import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCart, decrementItem, incrementItem, updateItemQty } from '../store/cart-slice';
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
  const decrementQty = () => dispatch(decrementItem(product));
  const incrementQty = () => dispatch(incrementItem(product));
  const handleQtyUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(ev.target.value);
    dispatch(updateItemQty({ product, qty: newQty }));
  }

  const itemInCart = cart.items.find(item => item.product.id == product.id);

  return (
    <div className="flex gap-2 mb-2">
      <div className="flex-1">{name}</div>
      <div className="flex-1">{description}</div>
      <div className="flex-1">
        <button onClick={decrementQty} className="btn">-</button>
        <input type="number" min={0} step={1} value={itemInCart?.qty || 0} onChange={handleQtyUpdate} className="text-center" />
        <button onClick={incrementQty} className="btn">+</button>
      </div>
      <div className="flex-1 text-right">{formatPrice(price)}</div>
    </div>
  )
}