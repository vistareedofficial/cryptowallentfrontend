import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaWallet, FaUserCircle, FaBitcoin, FaChartLine } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import AuthService from '../AuthService/AuthService';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [userName, setUserName] = useState('');
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setError(
        <span>
          Please log in. <Link to="/Login">Login here</Link>
        </span>
      );
      return;
    }

    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      console.warn('Token expired. Logging out...');
      AuthService.clearTokens();
      setError(
        <span>
          Session expired. Please log in again.{' '}
          <Link to="/Login">Login here</Link>
        </span>
      );
      navigate('/Login');
      return;
    }

    const userId = decoded.sub || decoded.user_id;
    if (!userId) {
      setError(
        <span>
          Invalid token. Please log in again. <Link to="/Login">Login here</Link>
        </span>
      );
      navigate('/Login');
      return;
    }

    const fetchProfileAndAssets = async () => {
      try {
        const profileRes = await axios.get(
          `https://cryptoexchanebackend-cvrq.onrender.com/users/crypto-user/profile?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        const user = profileRes.data.user;
        setUserName(user.full_name);

        const assetRes = await axios.get(
          `https://cryptoexchanebackend-cvrq.onrender.com/coins/total-assets?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        setAssets(assetRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data.');
      }
    };

    const fetchBalance = async () => {
      try {
        const balanceRes = await axios.get(
          `https://cryptoexchanebackend-cvrq.onrender.com/coins/crypto/balance?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        setBalance(balanceRes.data);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };

    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          'https://cryptoexchanebackend-cvrq.onrender.com/coins/coins/all'
        );
        setMarketData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileAndAssets();
    fetchBalance();
    fetchMarketData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="dashboard-header">
            <div className="wallet-balance desktop-hidden">
              <FaWallet className="wallet-icon" />
              <div>
                <p className="label">Account Balance</p>
                {balance ? (
                  <>
                    <h3>USD: {balance.total_balance_usdt.toLocaleString()}</h3>
                    <p className="balance-btc">
                      = {balance.total_balance_btc.toFixed(6)} BTC
                    </p>
                  </>
                ) : (
                  <h3>Loading...</h3>
                )}
              </div>
            </div>
          </div>
          <div className="button-group">
            <Link to='/DepositCrypto'>
              <button className="deposit-button">Deposit</button>
            </Link>
            <Link to="/PreWithdrawal">
              <button className="dashboard-withdraw-button">Withdraw</button>
            </Link>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;