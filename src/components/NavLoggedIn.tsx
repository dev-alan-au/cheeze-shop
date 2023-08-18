import { Button } from 'react-daisyui';

import { useAppDispatch } from '../hooks';
import { logout } from '../store/user-slice';

export default function NavLoggedIn() {
  const dispatch = useAppDispatch();

  return (
    <Button onClick={() => dispatch(logout())}>Logout</Button>
  )
}