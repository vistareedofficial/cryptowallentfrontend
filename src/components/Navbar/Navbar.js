import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../AuthService/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faHome, faBars, faUsers, faCompactDisc, faTimes } from '@fortawesome/free-solid-svg-icons';
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
      <a href='/'>
      <img src={riserise} alt="Riserise Logo" className="navbar-logo-img" />
      </a>
      <div className="navbar-container">
        <ul className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
          <li className="navbar-item">
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}> {/* Add onClick handler to close menu */}
          {/* <FontAwesomeIcon icon={faHome} /> */}
          HOME
        </Link>

          </li>
          <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
            <Link to="/" className="navbar-link">
              {/* <FontAwesomeIcon icon={faUsers} /> */}
              ARTISTS
            </Link>
          </li>
          <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
            <Link to="/" className="navbar-link">
              {/* <FontAwesomeIcon icon={faCompactDisc} /> */}
              RELEASES
            </Link>
          </li>
          <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
            <Link to="/Contact" className="navbar-link">
              {/* <FontAwesomeIcon icon={faCompactDisc} /> */}
              CONTACT
            </Link>
          </li>
          {!isLoggedIn && (
            <>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link">
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  SIGN UP
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  {/* <FontAwesomeIcon icon={faSignInAlt} /> */}
                  LOGIN
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="navbar-item" onClick={() => setIsMenuOpen(false)}>
                <Link to="/dashboard" className="navbar-link">
                  DASHBOARD
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link">
                  LOGOUT
                </button>
              </li>
            </>
          )}
        </ul>
        <div className={`navbar-toggle ${isMenuOpen ? 'close-menu' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="2x" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
