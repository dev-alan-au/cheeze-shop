import { Button, Input, Join } from 'react-daisyui';

import { useAppDispatch } from '../hooks';
import { Product } from '../models/Product';
import { formatPrice } from '../helpers/currency';
import { removeItem, decrementItem, incrementItem, updateItemQty } from '../store/cart-slice';

interface CartItemProps {
  product: Product;
  qty: number;
}

export default function CartItem({ product, qty }: CartItemProps) {
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
    <div className="flex">
      <div className="flex-1">{name}</div>
      <div className="flex-1">
        <Join>
          <Button onClick={decrementQty}>-</Button>
          <Input type="number" min={0} step={1} value={qty} onChange={handleQtyUpdate} className="mx-2 text-center w-32" />
          <Button onClick={incrementQty}>+</Button>
        </Join>
      </div>
      <div className="flex-auto text-right">{formatPrice(price * qty)}</div>
      <div className="flex-auto text-right">
        <Button onClick={removeCartItem}>Remove</Button>
      </div>
    </div>
  )
}