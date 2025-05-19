import React, { useState } from 'react';
import './WithdrawCrypto.css';

const WithdrawCrypto = ({ userBalance = 0 }) => {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMaxClick = () => {
    setAmount(userBalance.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Simulate async withdrawal
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage(`Successfully withdrew ${amount} BTC to ${walletAddress}`);
      setAmount('');
      setWalletAddress('');
    } catch (error) {
      setMessage('Withdrawal failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-container">
      <form className="withdraw-form" onSubmit={handleSubmit}>
        <h2>Withdraw Crypto</h2>

        <div className="input-row">
          <input
            type="number"
            step="any"
            className="withdraw-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={loading}
          />
          <button
            type="button"
            className="max-btn"
            onClick={handleMaxClick}
            disabled={loading || userBalance === 0}
          >
            Max
          </button>
        </div>

        <input
          type="text"
          className="withdraw-input"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
          disabled={loading}
        />

        <button type="submit" className="withdraw-button" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Withdraw'}
        </button>

        {message && <p className="withdraw-message">{message}</p>}
      </form>
    </div>
  );
};

export default WithdrawCrypto;
