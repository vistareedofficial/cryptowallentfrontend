import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../AuthService/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faHome, faBars, faUsers, faCompactDisc, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import riserise from "../Images/riserise.PNG";
import columbia from "../Images/columbia.PNG";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(AuthService.isLoggedIn());
    };

    checkLoginStatus(); // Check login status when component mounts

    // Subscribe to login status changes
    const unsubscribe = AuthService.subscribe(checkLoginStatus);

    // Unsubscribe from login status changes when component unmounts
    return () => unsubscribe();
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
       <br/>
        <br/>
        <br/>
        <div className={`navbar-toggle ${isMenuOpen ? 'close-menu' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="2x" />
        </div>
      <a href='/'>
        <img src={columbia} alt="Riserise Logo" className="navbar-logo-img" />
      </a>
      <div className="navbar-container">
        <ul className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              HOME
            </Link>
          </li>
          <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
            <Link to="/" className="navbar-link">
              ARTISTS
            </Link>
          </li>
          <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
            <Link to="/" className="navbar-link">
              RELEASES
            </Link>
          </li>
          <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
            <Link to="/Contact" className="navbar-link">
              CONTACT
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                <Link to="/dashboard" className="navbar-link">
                  DASHBOARD
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="navbar-link">
                  LOGOUT
                </button>
              </li>

            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  SIGN UP
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  LOGIN
                </Link>
              </li>
            </>
          )}
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
