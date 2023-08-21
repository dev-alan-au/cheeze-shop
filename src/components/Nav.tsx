import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Menu } from 'react-daisyui';

import { useStore } from '../hooks/useStore';
import { selectUser, logout } from '../store/user-slice';
import { toggleVisibility } from '../store/aside-slice';

export default function Nav() {
  const { useAppSelector, useAppDispatch } = useStore();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navbar = useRef<HTMLDivElement>(null);
  const updateNavbar = useCallback(() => {
    let nav = navbar.current;

    if (nav) {
      const details = nav.getElementsByTagName('details');
      Array.from(details).forEach(detail => detail.removeAttribute('open'))
    }
  }, [navbar.current]);

  useEffect(() => {
    updateNavbar();
  }, [location]);

  return (
    <Navbar ref={navbar} className="border-b-2">
      <div className="flex-1">
        <Link to="/">
          <span className="text-amber-400 font-extrabold font-mono">
            // CheezeShop
          </span>
        </Link>
      </div>
      <div className="flex-none">
        <Menu horizontal={true} className="px-1">
          <Menu.Item>
            <Link to="/shop" className={location.pathname == '/shop' ? 'active' : undefined}>Shop</Link>
          </Menu.Item>
          <Menu.Item className="ml-2">
            <button onClick={() => dispatch(toggleVisibility())}>Cart</button>
          </Menu.Item>
          {!user.authorised && <Menu.Item className="ml-2">
            <Link to="/account">Login</Link>
          </Menu.Item>}
          {user.authorised && <Menu.Item className="ml-2">
            <details>
              <summary>My Account</summary>
              <ul className="p-3 bg-base-100 right-0 w-60">
                {user.authorised && <li className="mb-3">
                  <Link to="/account" className={location.pathname == '/account' ? 'active' : undefined}>Edit Account Details</Link>
                </li>}
                {user.authorised && <li>
                  <span onClick={() => dispatch(logout())}>Logout</span>
                </li>}
              </ul>
            </details>
          </Menu.Item>}
        </Menu>
      </div>
    </Navbar>
  )
}