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
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}