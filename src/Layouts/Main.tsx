import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Button } from 'react-daisyui';

import { useAppDispatch, useAppSelector } from '../hooks';
import { Theme, selectTheme, updateTheme } from '../store/theme-slice';
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

  useEffect(() => {
    setHTMLTheme(theme);
  }, []);

  useEffect(() => {
    handleStoreChange(theme);
  }, [theme]);

  const handleThemeChange = () => {
    dispatch(updateTheme(theme == 'light' ? 'dark' : 'light' as Theme))
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