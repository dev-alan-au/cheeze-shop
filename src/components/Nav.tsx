import { Link } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { selectUser } from '../store/user-slice';
import NavLoginForm from './NavLoginForm';
import NavLoggedIn from './NavLoggedIn';

export default function Nav() {
  const user = useAppSelector(selectUser);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        {user.authorised && <li><Link to="/account">My Account</Link></li>}
      </ul>
      {user.authorised ? <NavLoggedIn /> : <NavLoginForm />}
    </nav>
  )
}