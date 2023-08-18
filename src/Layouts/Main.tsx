import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Button } from 'react-daisyui';

import { useAppDispatch, useAppSelector } from '../hooks';
import { Theme, selectTheme, updateTheme } from '../store/theme-slice';
import { store } from '../store/store';
import Nav from '../components/Nav';
import Cart from '../components/Cart';

export default function MainLayout() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const setHTMLTheme = (theme: Theme) => {
    document.getElementsByTagName('html')[0].setAttribute('data-theme', theme as string);
  }

  const storeTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
  }

  const handleStoreChange = (theme: Theme) => {
    storeTheme(theme);
    setHTMLTheme(theme);
  }

  const unsubscribe = store.subscribe(() => { handleStoreChange(store.getState().theme) });

  useEffect(() => {
    setHTMLTheme(theme);

    return unsubscribe();
  }, []);

  const handleThemeChange = () => {
    dispatch(updateTheme(store.getState().theme == 'light' ? 'dark' : 'light' as Theme))
  };

  return (
    <>
      <Button onClick={handleThemeChange}></Button>
      <Nav />
      <Outlet />
      {/* like Slot of children */}
      <Cart />
    </>
  )
}