import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import './DepositCrypto.css';

const DepositCrypto = () => {
  const [assets, setAssets] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(() => {
    const fetchUserIdAndAssets = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('Please log in.');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('access_token');
          setError('Session expired. Please log in again.');
          return;
        }

        const userId = decoded.sub || decoded.user_id;
        if (!userId) {
          setError('Invalid token. Please log in again.');
          return;
        }

        setUserId(userId);

        const response = await axios.get(`http://127.0.0.1:8000/coins/total-assets?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        setAssets(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching user ID or assets:', err);
        setError('Failed to fetch assets.');
      }
    };

    fetchUserIdAndAssets();
  }, []);

  const handleSelectToken = (token) => {
    setSelectedToken((prev) => (prev?.token_symbol === token.token_symbol ? null : token));
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="asset-container">
      <h2 className="selecttoken">Select Token to Deposit</h2>
      {error && <div className="error-message">{error}</div>}
      {assets.length > 0 ? (
        assets.map((asset) => (
          <div key={asset.token_symbol} className="asset-block">
            <div className="asset-item" onClick={() => handleSelectToken(asset)}>
              <span className="symbol">{asset.token_symbol}</span>
              <span className="balance">{asset.balance}</span>
            </div>

            {selectedToken?.token_symbol === asset.token_symbol && (
              <div className="token-details">
                <div className="qr-container">
                    <QRCodeCanvas value={asset.public_address} size={160} />

                </div>
                <p className="public-address"><strong>Public Address:</strong> {asset.public_address}</p>
                <button className="copy-btn" onClick={() => handleCopy(asset.public_address)}>Copy Address</button>
                <p className="note">Only send <strong>{asset.token_symbol}</strong> to this address. Sending other tokens may result in loss.</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No assets found for this user.</div>
      )}
    </div>
  );
};

export default DepositCrypto;
