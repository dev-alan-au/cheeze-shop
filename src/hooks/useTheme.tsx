import { useEffect, useMemo } from 'react';

import { useStore } from './useStore';
import { Theme, selectTheme, updateTheme } from '../store/theme-slice';

export function useTheme() {
  const { useAppDispatch, useAppSelector } = useStore();
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const alternateTheme = useMemo(() => theme == 'light' ? 'dark' : 'light', [theme]);

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

  const toggleTheme = () => {
    dispatch(updateTheme(theme == 'light' ? 'dark' : 'light' as Theme))
  };

  return {
    theme,
    alternateTheme,
    toggleTheme,
  }
}