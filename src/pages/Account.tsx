import { Button } from 'react-daisyui';

import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUser, logout } from '../store/user-slice';

export default function AccountPage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (!user.authorised) return (<p>Login to continue</p>)

  return (
    <div>
      {user.name}
      {user.email}
      <Button onClick={() => dispatch(logout())} className="btn w-60 rounded-full">Logout</Button>
    </div>
  )
}