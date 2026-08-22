import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'college_lost_found_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode;
    return (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
  });

  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      let dark = false;
      if (themeMode === 'dark') {
        dark = true;
      } else if (themeMode === 'light') {
        dark = false;
      } else {
        dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      if (dark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      setIsDark(dark);
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) root.classList.add('dark');
        else root.classList.remove('dark');
        setIsDark(e.matches);
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    localStorage.setItem(THEME_KEY, mode);
    setThemeModeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
