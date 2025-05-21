// WithdrawCrypto.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // fixed import (default import)
import './WithdrawCrypto.css';

const tokenList = [
  { id: 16, symbol: "BTC", name: "Bitcoin", price_in_usd: 95320 },
  { id: 17, symbol: "ETH", name: "Ethereum", price_in_usd: 1826.47 },
  { id: 14, symbol: "TRX", name: "Tron", price_in_usd: 0.244756 },
  { id: 15, symbol: "USDC", name: "USD Coin", price_in_usd: 0.999944 },
  { id: 18, symbol: "USDT", name: "Tether", price_in_usd: 1 },
];

const WithdrawCrypto = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [fee, setFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalDeduct, setTotalDeduct] = useState(0);
  const [isTaxed, setIsTaxed] = useState(false);
  const [showTaxInfo, setShowTaxInfo] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);

  const feePercent = 0.00005; // 0.005%

  useEffect(() => {
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

      const uid = decoded.sub || decoded.user_id;
      setUserId(uid);

      axios.get(`https://info.vistareed.com/users/crypto-user/profile?user_id=${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setUserData(res.data.user);
          setError('');
        })
        .catch(() => {
          setError('Failed to fetch user information.');
        });
    } catch {
      setError('Invalid token. Please log in again.');
    }
  }, []);

  const getTotalAssets = async (uid, symbol) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in.');
        return;
      }

      const res = await axios.get(`https://info.vistareed.com/coins/total-assets`, {
        params: { user_id: uid },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      let balances = {};
      if (Array.isArray(res.data)) {
        res.data.forEach(item => {
          balances[item.token_symbol.toUpperCase()] = parseFloat(item.balance);
        });
      }

      const balance = balances[symbol.toUpperCase()] || 0;
      setTokenBalance(balance);
      setError('');
    } catch (err) {
      console.error('Error fetching total assets:', err);
      setTokenBalance(0);
      setError('Failed to fetch token balance.');
    }
  };

  useEffect(() => {
    if (userId && tokenSymbol) {
      getTotalAssets(userId, tokenSymbol);
    }
  }, [tokenSymbol, userId]);

  useEffect(() => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      const calculatedFee = parsedAmount * feePercent;
      setFee(calculatedFee);

      // Tax calculation is handled on submit, so only update totalDeduct here as amount + fee
      setTotalDeduct(parsedAmount + calculatedFee);
    } else {
      setFee(0);
      setTotalDeduct(0);
    }

    // Reset tax info on amount change
    setShowTaxInfo(false);
    setTax(0);
    setIsTaxed(false);
  }, [amount]);

  const handleMaxClick = () => {
    if (tokenBalance <= 0) return;
    // Max withdrawable amount = balance / (1 + feePercent)
    const maxWithdrawable = tokenBalance / (1 + feePercent);
    setAmount(maxWithdrawable.toFixed(8));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    if (!userId || !userData) {
      setError('User not authenticated or user data not loaded.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Invalid amount.');
      return;
    }

    if (!recipientAddress.trim()) {
      setError('Recipient address is required.');
      return;
    }

    const calculatedFee = parsedAmount * feePercent;
    const calculatedTax = parsedAmount > 50000 ? parsedAmount * 0.025 : 0;
    const taxed = calculatedTax > 0;

    // Check total balance including fee and tax
    if (parsedAmount + calculatedFee > tokenBalance) {
      setError('Insufficient balance for withdrawal and network fee.');
      return;
    }

    setTax(calculatedTax);
    setIsTaxed(taxed);
    setShowTaxInfo(true);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please log in.');
        return;
      }

      const payload = {
        user_id: userId,
        token_symbol: tokenSymbol,
        amount: parsedAmount,
        recipient_address: recipientAddress,
        taxed: taxed,
      };

      const res = await axios.post('https://info.vistareed.com/coins/withdraw', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      setResponse({
        success: true,
        taxed: taxed,
        tax: calculatedTax,
      });

      if (taxed) {
        await axios.post('https://info.vistareed.com/auth/send-tax-notification', null, {
          params: {
            to_email: userData.email,
            full_name: userData.full_name,
            withdrawal_amount: parsedAmount,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Reset form and reload balance
      setAmount('');
      setRecipientAddress('');
      getTotalAssets(userId, tokenSymbol);
      setShowTaxInfo(false);
      setTax(0);
      setIsTaxed(false);
      setFee(0);
      setTotalDeduct(0);
      setError('');
    } catch (err) {
      console.error(err);
      setResponse({
        error: JSON.stringify(err.response?.data?.detail || err.message || 'An error occurred'),
      });
    }
  };

  return (
    <div className="withdraw withdraw-body">
      <div className="withdraw-container">
        <h2 className="withdraw-heading">Withdraw Token</h2>

        {error && <p className="withdraw-error">⚠️ {error}</p>}
        {response?.success && (
          <div className="withdraw-success">
            ✅ Withdrawal Submitted successfully!<br />
            {response.taxed && (
              <>
                ⚠️ Tax of 2.5% ({response.tax.toFixed(8)} {tokenSymbol}) must be paid separately to complete you withdrawal.<br />
                📧 We’ve sent payment instructions to your email.
              </>
            )}
          </div>
        )}
        {response?.error && <p className="withdraw-error">❌ {response.error}</p>}

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                step="any"
                className="withdraw-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                min="0"
              />
              <button
                type="button"
                className="withdraw-max-button"
                onClick={handleMaxClick}
                title="Withdraw max amount"
              >
                Max
              </button>
            </div>
            <p className="withdraw-balance">
              Available: <strong>{tokenBalance.toFixed(8)} {tokenSymbol}</strong>
            </p>
          </div>

          <div>
            <label className="withdraw-label">Recipient Address</label>
            <input
              type="text"
              className="withdraw-input"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient address"
              required
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div className="withdraw-fee-info">
            <p>
              Network Fee: {fee.toFixed(8)} {tokenSymbol} ({(feePercent * 100).toFixed(4)}%)
            </p>
            {showTaxInfo && (
              <p>
                Tax: {tax.toFixed(8)} {tokenSymbol} {isTaxed ? '(2.5% applied)' : '(No tax)'}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="withdraw-button"
            disabled={
              !amount ||
              parseFloat(amount) <= 0 ||
              !recipientAddress.trim() ||
              parseFloat(amount) + fee > tokenBalance
            }
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawCrypto;
