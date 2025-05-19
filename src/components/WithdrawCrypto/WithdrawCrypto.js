import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WithdrawCrypto.css';

const WithdrawCrypto = ({ tokenSymbol, user, maxBalance }) => {
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [fee, setFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [isTaxed, setIsTaxed] = useState(false);
  const [totalDeduct, setTotalDeduct] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);

  const handleMaxClick = () => {
    setAmount(maxBalance?.toString() || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User not authenticated.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Invalid amount.');
      return;
    }

    const calculatedFee = parsedAmount * 0.00005;
    let calculatedTax = 0;
    let taxed = false;

    if (parsedAmount > 50000) {
      taxed = true;
      calculatedTax = parsedAmount * 0.025;
    }

    const total = parsedAmount + calculatedFee + calculatedTax;
    setFee(calculatedFee);
    setTax(calculatedTax);
    setIsTaxed(taxed);
    setTotalDeduct(total);

    setLoading(true);
    try {
      const payload = {
        user_id: userId,
        token_symbol: tokenSymbol,
        amount: parsedAmount,
        recipient_address: recipientAddress,
        taxed: taxed,
      };

      const res = await axios.post('https://info.vistareed.com/coins/withdraw', payload);
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setResponse({ error: err.response?.data?.detail || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw {tokenSymbol}</h2>
      <form onSubmit={handleSubmit} className="withdraw-form">
        <div className="input-with-max">
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
            className="max-button"
            onClick={handleMaxClick}
            disabled={loading}
          >
            Max
          </button>
        </div>

        <input
          type="text"
          className="withdraw-input"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Enter recipient address"
          disabled={loading}
        />

        <button type="submit" className="withdraw-button" disabled={loading}>
          {loading ? 'Processing...' : 'Withdraw'}
        </button>
      </form>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Processing withdrawal...</p>
        </div>
      )}

      {fee > 0 && (
        <div className="withdraw-summary">
          <p>Fee: {fee.toFixed(6)} {tokenSymbol}</p>
          {isTaxed && <p>Tax: {tax.toFixed(6)} {tokenSymbol}</p>}
          <p>Total Deducted: {totalDeduct.toFixed(6)} {tokenSymbol}</p>
        </div>
      )}

      {response && (
        <div className="withdraw-response">
          {response.error ? (
            <p className="error-message">{response.error}</p>
          ) : (
            <p className="success-message">Withdrawal request submitted successfully!</p>
          )}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WithdrawCrypto;
