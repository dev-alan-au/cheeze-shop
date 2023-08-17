import { useQuery } from 'react-query';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectUser } from './store/user-slice';

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { data } = useQuery('products', () => axios.get('/products.json').then(res => res.data));
  if (data) console.log(data)

  return (
    <>
      {user.authorised ? <button onClick={() => dispatch({ type: 'user/logout' })}>Logout</button> : <button onClick={() => dispatch({ type: 'user/login', payload: { username: "ted", password: 'password' } })}>Login</button>}
      {user.name}
      {user.email}
    </>
  )
}

export default App
