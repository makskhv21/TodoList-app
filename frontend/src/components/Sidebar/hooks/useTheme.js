import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkTheme ? 'dark' : 'light'
    );
  }, [isDarkTheme]);

  return { isDarkTheme, toggleTheme };
};
