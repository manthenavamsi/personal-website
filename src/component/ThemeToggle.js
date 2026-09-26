import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

const REVEAL_DURATION = 500;

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const buttonRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = async () => {
    const next = theme === 'light' ? 'dark' : 'light';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Circular reveal from the toggle, adapted from Magic UI's AnimatedThemeToggler
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.setAttribute('data-theme', next);
        setTheme(next);
      });
    });
    await transition.ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: REVEAL_DURATION,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default ThemeToggle;
