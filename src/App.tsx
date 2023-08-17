import { useAppDispatch, useAppSelector } from './hooks';
import { selectUser } from './store/user-slice';
import Products from './components/Products';

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <>
      {user.authorised ? <button onClick={() => dispatch({ type: 'user/logout' })}>Logout</button> : <button onClick={() => dispatch({ type: 'user/login', payload: { username: "ted", password: 'password' } })}>Login</button>}
      {user.name}
      {user.email}
      <Products />
    </>
  )
}

export default App
