import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/images/Vamsi-logo.PNG'; // Import your logo

function Header() {
  const location = useLocation();
  
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="Vamsi Logo" className="logo-image" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>
            Blog
          </Link>
          <Link to="/bio" className={location.pathname === '/bio' ? 'active' : ''}>
            Bio
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

