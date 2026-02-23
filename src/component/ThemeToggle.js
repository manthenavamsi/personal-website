import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <button
      className={`theme-toggle-pill${theme === 'dark' ? ' dark' : ''}`}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <span className="toggle-circle"></span>
      <span className="toggle-moon">☽</span>
    </button>
  );
}

export default ThemeToggle;
