import { useAppDispatch } from '../hooks';
import { logout } from '../store/user-slice';

export default function NavLoggedIn() {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(logout())}>Logout</button>
  )
}