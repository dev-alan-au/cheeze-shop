import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from '../hooks';
import { addDiscount, removeDiscount, selectCart } from '../store/cart-slice';
import { DiscountCodes } from '../models/DiscountCodes';

export default function CartDiscount() {
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
      {cart.discount ? (<div>
        <div><strong>{cart.discount.code}</strong><button onClick={removeDiscountCode}>Remove discount</button></div>
      </div>) : (<form onSubmit={handleDiscount}>
        {errorMessage && <p>{errorMessage}</p>}
        <input type="text" onChange={(ev) => setDiscountCode(ev.target.value)} value={discountCode}
          className="border-gray-800 border-2"
        />
        <button type="submit" className="btn">Add discount code</button>
      </form>)}
    </>
  )
}