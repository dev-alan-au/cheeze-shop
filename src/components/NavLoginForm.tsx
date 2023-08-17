import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { login } from '../store/user-slice';

export default function NavLoginForm() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}