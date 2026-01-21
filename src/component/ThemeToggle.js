import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--primary', '#7F5AF0');
      root.style.setProperty('--surface', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--background', '#16161A');
      root.style.setProperty('--text', '#94A1B2');
      root.style.setProperty('--heading', '#FFFFFE');
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.08)');
    } else {
      root.style.setProperty('--primary', '#4FC1D0');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--text', '#333333');
      root.style.setProperty('--heading', '#333333');
      root.style.setProperty('--glass-border', 'rgba(79, 193, 208, 0.2)');
    }
  }, [isDark]);

  return (
    <div className="theme-toggle-wrapper">
      <FaSun className="theme-icon sun" />
      <button
        onClick={() => setIsDark(!isDark)}
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        aria-label="Toggle theme"
      >
        <span className="toggle-track" />
      </button>
      <FaMoon className="theme-icon moon" />
    </div>
  );
};

export default ThemeToggle;
