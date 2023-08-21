import { Button, Input, Join } from 'react-daisyui';

import { useStore } from '../hooks/useStore';
import { selectCart, decrementItem, incrementItem, updateItemQty } from '../store/cart-slice';
import { formatPrice } from '../helpers/currency';
import { Product } from '../models/Product';

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { useAppDispatch, useAppSelector } = useStore();
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
    <div className="flex gap-2 mb-8">
      <div className="flex-1">{name}</div>
      <div className="flex-1">{description}</div>
      <div className="flex-1">
        <Join className="items-center">
          <Button onClick={decrementQty} className="btn-circle btn-outline btn-sm">-</Button>
          <Input type="number" min={0} step={1} value={itemInCart?.qty || 0} onChange={handleQtyUpdate} className="mx-2 text-center w-32" />
          <Button onClick={incrementQty} className="btn-circle btn-outline btn-sm">+</Button>
        </Join>
      </div>
      <div className="flex-1 text-right">{formatPrice(price)}</div>
    </div>
  )
}