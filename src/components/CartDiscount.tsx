import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Input } from 'react-daisyui';

import { useStore } from '../hooks/useStore';
import { addDiscount, removeDiscount, selectCart } from '../store/cart-slice';
import { DiscountCodes } from '../models/DiscountCodes';

export default function CartDiscount() {
  const { useAppDispatch, useAppSelector } = useStore();
  const [discountCode, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const { data } = useQuery<Array<DiscountCodes>>('discount', () => axios.get('/discounts.json').then(res => res.data));

  const handleDiscount = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const code = discountCode.toLowerCase();
    if (!data?.length) {
      setErrorMessage("Invalid discount code");
    }

    const validDiscountCode = data?.find(validDiscountCode => validDiscountCode.code == code);
    if (validDiscountCode && (validDiscountCode.type == 'fixed' || validDiscountCode.type == 'percentage')) {
      const { type: discountType, value } = validDiscountCode;
      dispatch(addDiscount({
        code,
        discountAsPercentage: discountType == 'percentage' ? value : undefined,
        discountAsFixedAmount: discountType == 'fixed' ? value : undefined,
      }))
    }
  }

  const removeDiscountCode = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    dispatch(removeDiscount());
    setDiscountCode('');
  }

  useEffect(() => {
    setErrorMessage('');
  }, [discountCode]);

  return (
    <>
      {cart.discount ? (<div className="mb-2">
        <div className="flex justify-between items-center">
          <p><strong>{cart.discount.code}</strong></p>
          <Button onClick={removeDiscountCode} className="btn-secondary">Remove discount</Button>
        </div>
      </div>) : (<form onSubmit={handleDiscount}>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="flex items-center my-8">
          <label className="label flex-1 p-0 mr-2">
            <span className="label-text">Discount Code:</span>
            <Input type="text" onChange={(ev) => setDiscountCode(ev.target.value)} value={discountCode} placeholder="gimme5 || friyay" />
          </label>
          <Button type="submit" className="btn-secondary">Add discount code</Button>
        </div>
      </form>)}
    </>
  )
}