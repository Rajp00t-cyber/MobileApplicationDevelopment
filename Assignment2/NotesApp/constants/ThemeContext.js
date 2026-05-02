import React, { createContext, useContext, useState } from 'react';

const darkTheme = {
  background: '#0f1117',
  card: '#1e2130',
  savedCard: '#162032',
  input: '#1e2130',
  inputBorder: '#2e3250',
  savedCardBorder: '#1e4a6e',
  text: '#ffffff',
  subtitle: '#aaaaaa',
  savedText: '#7dd3fc',
  emptyText: '#555555',
  modalBox: '#1e2130',
  modalBorder: '#2e3250',
};

const lightTheme = {
  background: '#f0f4ff',
  card: '#ffffff',
  savedCard: '#e8f4fd',
  input: '#f5f7ff',
  inputBorder: '#d0d8f0',
  savedCardBorder: '#90cdf4',
  text: '#1a1a2e',
  subtitle: '#555555',
  savedText: '#2b6cb0',
  emptyText: '#aaaaaa',
  modalBox: '#ffffff',
  modalBorder: '#d0d8f0',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(prev => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}