import { useAppDispatch, useAppSelector } from './hooks';
import { selectUser, login, logout } from './store/user-slice';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {
  // The `state` arg is correctly typed as `RootState` already
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <>
      {user.authorised ? <button onClick={() => dispatch({ type: logout })}>Logout</button> : <button onClick={() => dispatch({ type: login, payload: { username: "ted", password: 'password' } })}>Login</button>}
      {user.name}
      {user.email}
      <Products />
      <Cart />
    </>
  )
}

export default App
