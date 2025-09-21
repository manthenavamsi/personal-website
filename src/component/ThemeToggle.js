import React, { useState, useEffect, useCallback } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme on component mount
  useEffect(() => {
    const initializeTheme = () => {
      const root = document.documentElement;
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Priority: saved preference > system preference > default (light)
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      const shouldBeDark = initialTheme === 'dark';

      setIsDark(shouldBeDark);
      root.setAttribute('data-theme', initialTheme);

      // Store the initial theme if not already saved
      if (!savedTheme) {
        localStorage.setItem('theme', initialTheme);
      }

      setIsLoading(false);
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setIsDark(e.matches);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!isLoading) {
      const root = document.documentElement;
      const theme = isDark ? 'dark' : 'light';

      // Add transition class for smooth theme switching
      root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // Remove transition after animation completes
      const timer = setTimeout(() => {
        root.style.transition = '';
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isDark, isLoading]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  }, [toggleTheme]);

  if (isLoading) {
    return null; // Prevent flash of incorrect theme
  }

  return (
    <div className="theme-toggle-wrapper">
      <FaSun
        className={`theme-icon sun ${!isDark ? 'active' : ''}`}
        aria-hidden="true"
      />
      <button
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        aria-pressed={isDark}
        role="switch"
        type="button"
      >
        <span className="toggle-track" aria-hidden="true" />
      </button>
      <FaMoon
        className={`theme-icon moon ${isDark ? 'active' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default ThemeToggle;
