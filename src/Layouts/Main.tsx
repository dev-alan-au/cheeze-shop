import { Outlet } from 'react-router';

import Nav from '../components/Nav';
import Cart from '../components/Cart';

export default function MainLayout() {


  return (
    <>
      <Nav />
      <Outlet />
      {/* like Slot of children */}
      <Cart />
    </>
  )
}