import { Button } from 'react-daisyui';

import { useStore } from '../hooks/useStore';
import { selectUser, logout } from '../store/user-slice';
import NavLoginForm from '../components/LoginForm';
import { useTheme } from '../hooks/useTheme';

export default function AccountPage() {
  const { useAppDispatch, useAppSelector } = useStore();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { alternateTheme, toggleTheme } = useTheme();

  if (!user.authorised) return (<NavLoginForm />)

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <div className="mt-5">
        <Button onClick={toggleTheme} className="btn w-60 rounded-full">Switch to {alternateTheme} theme</Button>
      </div>
      <div className="mt-5">
        <Button onClick={() => dispatch(logout())} className="btn w-60 rounded-full">Logout</Button>
      </div>
    </div>
  )
}