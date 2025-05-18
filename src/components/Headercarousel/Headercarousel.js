import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Headercarousel.css';
import usdtLogo from '../Images/usdtTether.webp';
import usdcLogo from '../Images/usdcicon.png';
import tronLogo from '../Images/Tronicon.png';
import btcLogo from '../Images/bitcoinicon.png';
import ethLogo from '../Images/ethhhh.png';
import { jwtDecode } from 'jwt-decode';
import AuthService from '../AuthService/AuthService';

const CryptoCarousel = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);

  const fetchCoins = async () => {
    try {
      const response = await axios.get('https://info.vistareed.com/coins/coins/all');
      setCoins(response.data);
    } catch (err) {
      setError('Error fetching coins: ' + err.message);
    }
  };

  const fetchBalance = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.warn('No token found. Please log in.');
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
        `https://info.vistareed.com/coins/crypto/balance?user_id=${userId}`,
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

  useEffect(() => {
    fetchCoins();
    fetchBalance();
    const intervalId = setInterval(fetchCoins, 1800000);
    setIsLoggedIn(AuthService.isLoggedIn());
    return () => clearInterval(intervalId);
  }, []);

  const iconMap = {
    USDT: usdtLogo,
    USDC: usdcLogo,
    TRX: tronLogo,
    BTC: btcLogo,
    ETH: ethLogo,
  };

  return (
    <div className="crypto-hero">
      {/* Mobile Balance Display */}
      {isLoggedIn && balance && !error && (
        <div className="mobile-balance">
          <p className="balance-title">Account Balance</p>
          <p className="balance-usdt">USD: {balance.total_balance_usdt.toLocaleString()}</p>
          <p className="balance-btc">= {balance.total_balance_btc.toFixed(6)} BTC</p>
        </div>
      )}

      {/* Mobile Deposit & Withdraw Buttons */}
      {isLoggedIn && (
        <div className="mobile-actions">
          <Link to='/DepositCrypto'>
          <Button variant="primary" size="sm" className="action-btn">Deposit</Button>
          </Link>
          <Link to="/PreWithdrawal">
          <Button variant="danger" size="sm" className="action-btn">Withdraw</Button>
          </Link>
        </div>
      )}

      <div className="hero-content">
        <h1>Welcome to VistaReed Crypto</h1>
        <p>Real-time prices. Secure trading. Built for everyone.</p>
        {!isLoggedIn && (
          <Link to="/signup">
            <Button variant="success" size="lg">Get Started</Button>
          </Link>
        )}
      </div>

      {error && isLoggedIn && (
        <div className="carousel-balance-error">{error}</div>
      )}

      <div className="coin-table">
        <div className="coin-table-header hide-mobile">
          <div className="header-cell">#</div>
          <div className="header-cell">Coin</div>
          <div className="header-cell">Symbol</div>
          <div className="header-cell">Price (USD)</div>
          <div className="header-cell">24h Change</div>
        </div>

        <div className="coin-table-body">
          {coins.map((coin, idx) => (
            <div className="coin-table-row" key={coin.id}>
              <div className="coin-table-cell hide-mobile">{idx + 1}</div>
              <div className="coin-table-cell">
                {iconMap[coin.symbol.toUpperCase()] && (
                  <img
                    src={iconMap[coin.symbol.toUpperCase()]}
                    alt={`${coin.name} icon`}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '8px',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
                {coin.name}
              </div>
              <div className="coin-table-cell">{coin.symbol}</div>
              <div className="coin-table-cell">
                ${parseFloat(coin.price_in_usd).toLocaleString()}
              </div>
              <div className="coin-table-cell hide-mobile">
                {parseFloat(coin.change_24h).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CryptoCarousel;
