import { useState } from 'react';
import { Button, Input } from 'react-daisyui';

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
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Username:</span>
          <Input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />
        </label>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password:</span>
          <Input type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
        </label>
      </div>
      <Button type="submit">Login</Button>
    </form>
  )
}