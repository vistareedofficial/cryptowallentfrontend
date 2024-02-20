// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Membership
        </Link>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
          <li className="navbar-item">
            <Link to="/signup" className="navbar-link">
               Sign Up
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
               Login
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">
               Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
