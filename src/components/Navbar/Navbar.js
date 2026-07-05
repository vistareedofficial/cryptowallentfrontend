import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faHome,
  faChartLine,
  faExchangeAlt,
  faUserCircle,
  faSignOutAlt,
  faCoins,
  faEye,
  faEyeSlash,
  faShieldAlt,
  faPiggyBank, // ← Added for Investment
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../Images/vistareedddddddddd.JPG';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AuthService from '../AuthService/AuthService';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(AuthService.isLoggedIn());
    checkLogin();
    const unsub = AuthService.subscribe(checkLogin);
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.warn('No token found. Please log in.');
        setError('Please log in.');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          console.warn('Token expired. Logging out...');
          AuthService.clearTokens();
          setIsLoggedIn(false);
          setError('Session expired. Please log in again.');
          return;
        }

        const userId = decoded.sub || decoded.user_id;
        if (!userId) {
          setError('Invalid token. Please log in again.');
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/coins/crypto/balance?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        setBalance(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Failed to fetch balance.');
      }
    };

    if (isLoggedIn) {
      fetchBalance();
    }
  }, [isLoggedIn]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    AuthService.clearTokens();
    setBalance(null);
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload(); // Force reload to reset all components
  };

  return (
    <>
      <nav className="crypto-navbar">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="VistaReed Crypto" />
          </Link>

          {isLoggedIn && balance && !error && (
            <div className="balance-wrapper">
              <button className="hide-balance-btn" onClick={() => setShowBalance(!showBalance)}>
                <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} />{' '}
                {showBalance ? 'Hide ' : 'Show Balance'}
              </button>
              {showBalance && (
                <>
                  <p className="balance-usdt">Account Balance</p>
                  <p className="balance-usdt">
                    USD: {balance.total_balance_usdt.toLocaleString()}
                  </p>
                  <p className="balance-btc">= {balance.total_balance_btc.toFixed(6)} BTC</p>
                </>
              )}
            </div>
          )}

          {error && isLoggedIn && <div className="balance-error">{error}</div>}

          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
            </Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Market
            </Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faExchangeAlt} className="nav-icon" /> Trade
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faUserCircle} className="nav-icon" /> Contact
            </Link>
            <Link to="/PrivacyPolicy" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faShieldAlt} className="nav-icon" /> Privacy Policy
            </Link>
            <Link to="/Investment" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faPiggyBank} className="nav-icon" /> Investment
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faCoins} className="nav-icon" /> Assets
                </Link>
                <button
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faUserCircle} className="nav-icon" /> Sign Up
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Login
                </Link>
              </>
            )}
          </div>

          <div className="manual-toggle-icon" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>
        </div>
      </nav>

      <div className="bottom-nav">
        <Link to="/" className="bottom-nav-item">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>
        <Link to="/" className="bottom-nav-item center">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Market</span>
        </Link>
        <Link to="/investment" className="bottom-nav-item center">
          <FontAwesomeIcon icon={faPiggyBank} />
          <span>Investment</span>
        </Link>
        <Link to="/" className="bottom-nav-item center">
          <FontAwesomeIcon icon={faExchangeAlt} />
          <span>Trade</span>
        </Link>
        <Link to="/dashboard" className="bottom-nav-item">
          <FontAwesomeIcon icon={faCoins} />
          <span>Assets</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
