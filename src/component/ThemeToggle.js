import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="theme-toggle-wrapper">
      <span className="theme-icon">☀</span>
      <button className={`theme-toggle${theme === 'dark' ? ' dark' : ''}`} onClick={toggle} aria-label="Toggle theme">
        <span className="toggle-track"></span>
      </button>
      <span className="theme-icon">☽</span>
    </div>
  );
}

export default ThemeToggle;
