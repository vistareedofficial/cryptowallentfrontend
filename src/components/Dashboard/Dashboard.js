import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaWallet, FaUserCircle, FaBitcoin, FaChartLine } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import AuthService from '../AuthService/AuthService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState(0.0);
  const [userName, setUserName] = useState('');
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [marketData, setMarketData] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setError('Please log in.');
      return;
    }

    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      console.warn('Token expired. Logging out...');
      AuthService.clearTokens();
      setError('Session expired. Please log in again.');
      return;
    }

    const userId = decoded.sub || decoded.user_id;
    if (!userId) {
      setError('Invalid token. Please log in again.');
      return;
    }

    const fetchProfileAndAssets = async () => {
      try {
        const profileRes = await axios.get(`http://127.0.0.1:8000/users/crypto-user/profile?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const user = profileRes.data.user;
        setUserName(user.full_name);

        const assetRes = await axios.get(`http://127.0.0.1:8000/coins/total-assets?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const assetData = assetRes.data;
        setAssets(assetData);

        const totalUSD = assetData.reduce((acc, item) => acc + parseFloat(item.balance), 0);
        setBalance(totalUSD);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data.');
      }
    };

    const fetchMarketData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/coins/coins/all');
        setMarketData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileAndAssets();
    fetchMarketData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="wallet-balance desktop-hidden">
          <FaWallet className="wallet-icon" />
          <div>
            <p className="label">Wallet Balance</p>
            <h3>{balance.toFixed(2)} USD</h3>
          </div>
        </div>

        <div className="button-group">
          <Link to='/DepositCrypto'>
            <button className="dashboard-button small">Deposit</button>
          </Link>
          <Link to="/PreWithdrawal">
            <button className="dashboard-button small withdraw">Withdraw</button>
          </Link>
        </div>
      </div>

      <div className="profile-card">
        <FaUserCircle size={60} className="profile-icon" />
        <h3>{userName}</h3>
      </div>

      <section className="section asset-section">
        <h3><FaBitcoin className="section-icon" /> Total Assets</h3>
        <ul>
          {assets.map((asset) => (
            <li key={asset.token_symbol}>
              {asset.token_symbol}: {asset.balance}
            </li>
          ))}
        </ul>
      </section>

      <section className="section market-section">
        <h3><FaChartLine className="section-icon" /> Market Overview</h3>
        <ul>
          {marketData.map((coin) => (
            <li key={coin.symbol}>
              {coin.name} ({coin.symbol}): ${coin.price_in_usd.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Dashboard;
