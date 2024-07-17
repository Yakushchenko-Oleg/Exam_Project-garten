import React, {createContext, useEffect} from 'react'
import { useState } from 'react';
// import { useLocalStorage } from '../hooks/useLocalStorage'

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
     localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider