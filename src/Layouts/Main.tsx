import { Outlet } from 'react-router';
import { Drawer } from 'react-daisyui';

import { useStore } from '../hooks/useStore';
import { toggleVisibility, selectAside } from '../store/aside-slice';
import Nav from '../components/Nav';
import Cart from '../components/Cart';

export default function MainLayout() {
  const { useAppDispatch, useAppSelector } = useStore();
  const asideVisibility = useAppSelector(selectAside);
  const dispatch = useAppDispatch();

  return (
    <>
      <Nav />
      <main className="p-5">
        <Outlet />
      </main>
      <Drawer open={asideVisibility} onClickOverlay={() => dispatch(toggleVisibility())} side={<div className="p-4 w-11/12 h-full bg-base-200 text-base-content"><Cart /></div>} />
    </>
  )
}
