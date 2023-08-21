import { Button, Input, Join } from 'react-daisyui';

import { useStore } from '../hooks/useStore';
import { Product } from '../models/Product';
import { formatPrice } from '../helpers/currency';
import { removeItem, decrementItem, incrementItem, updateItemQty } from '../store/cart-slice';

interface CartItemProps {
  product: Product;
  qty: number;
}

export default function CartItem({ product, qty }: CartItemProps) {
  const { useAppDispatch } = useStore();
  const dispatch = useAppDispatch();
  const { name, price } = product;

  // TODO: refactor this
  const removeCartItem = () => dispatch(removeItem(product));
  const decrementQty = () => dispatch(decrementItem(product));
  const incrementQty = () => dispatch(incrementItem(product));
  const handleQtyUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(ev.target.value);
    dispatch(updateItemQty({ product, qty: newQty }));
  }

  return (
    <div className="flex items-center mb-8">
      <div className="flex-1">{name}</div>
      <div className="flex-1">
        <Join className="items-center">
          <Button onClick={decrementQty} className="btn-circle btn-outline btn-sm">-</Button>
          <Input type="number" min={0} step={1} value={qty} onChange={handleQtyUpdate} className="mx-2 text-center w-32" />
          <Button onClick={incrementQty} className="btn-circle btn-outline btn-sm">+</Button>
        </Join>
      </div>
      <div className="flex-auto text-right">{formatPrice(price * qty)}</div>
      <div className="flex-auto text-right">
        <Button onClick={removeCartItem} className="btn-circle btn-error">x</Button>
      </div>
    </div>
  )
}