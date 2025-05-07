import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './PreWithdrawal.css';

const PreWithdrawal = () => {
  const [assets, setAssets] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserIdAndAssets = async () => {
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
          localStorage.removeItem('access_token');
          setError('Session expired. Please log in again.');
          return;
        }

        const userId = decoded.sub || decoded.user_id;
        if (!userId) {
          setError('Invalid token. Please log in again.');
          return;
        }

        setUserId(userId); // Set the user ID

        // Fetch the assets for the user
        const response = await axios.get(`http://127.0.0.1:8000/coins/total-assets?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setAssets(response.data);
        setError(''); // Reset error if the assets are fetched successfully
      } catch (err) {
        console.error('Error fetching user ID or assets:', err);
        setError('Failed to fetch assets.');
      }
    };

    fetchUserIdAndAssets();
  }, []);

  return (
    <div className="asset-container">
      <h2 className='selecttoken'>Select Tokens</h2>
      {error && <div className="error-message">{error}</div>}
      {assets.length > 0 ? (
        assets.map((asset) => (
          <Link
            key={asset.token_symbol}
            to={`/WithdrawCrypto`}
            state={{ tokenSymbol: asset.token_symbol, balance: asset.balance }} // Pass token symbol and balance as state
            className="asset-link"
          >
            <div className="asset-item">
              <span className="symbol">{asset.token_symbol}</span>
              <span className="balance">{asset.balance}</span>
            </div>
          </Link>
        ))
      ) : (
        <div>No assets found for this user.</div>
      )}
    </div>
  );
};

export default PreWithdrawal;
