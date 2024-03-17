import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../AuthService/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import riserise from "../Images/riserise.PNG";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(AuthService.isLoggedIn());
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    AuthService.clearTokens();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <img src={riserise} alt="Riserise Logo" className="navbar-logo-img" />
      <div className="navbar-container">
        
        <Link to="/" className="navbar-logo">
          Membership
        </Link>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
          {!isLoggedIn && (
            <>
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
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
