import React, {createContext} from 'react'
import { useState } from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ( {children} ) => {

  const [theme, setTheme] = useState(false) ;

  const toggleTheme = () => {
    setTheme(!theme)
  }

  return (
    <ThemeContext.Provider value={ {theme, toggleTheme} }>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider