import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    console.log('Initial theme from localStorage:', saved);
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    console.log('Theme changed to:', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
      root.classList.add('dark');
      console.log('Added dark class to root');
    } else {
      root.classList.remove('dark');
      console.log('Removed dark class from root');
    }
    
    console.log('Root classes:', root.className);
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle clicked, current isDark:', isDark);
    setIsDark(prev => {
      const newValue = !prev;
      console.log('New isDark value:', newValue);
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
