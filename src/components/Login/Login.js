import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../AuthService/AuthService';
import './Login.css'; // Reuse same styles as signup

const Login = () => {
  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await fetch('https://info.vistareed.com/auth/login/crypto-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        const detail = data?.detail;
        const message = data?.message;

        if (detail) {
          setError(detail); // Will display 'Account not Activated. Contact Admin to activate your account.'
        } else if (message) {
          setError(message);
        } else {
          setError(typeof data === 'string' ? data : 'Login failed. Please try again.');
        }

        setLoading(false);
        return;
      }

      AuthService.setTokens(data.access_token, data.refresh_token);
      console.log('Tokens Set:', data.access_token, data.refresh_token);
      setSuccessMessage(data.message || 'Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crypto-signup-container">
      <form className="crypto-signup-form" onSubmit={handleSubmit}>
        <h2>🔐 Crypto User Login</h2>

        {error && <div className="crypto-error">{error}</div>}
        {successMessage && <div className="crypto-success">{successMessage}</div>}

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <p style={{ textAlign: 'right', marginTop: '10px' }}>
          <Link to="/PasswordResetRequest" style={{ color: '#3498db', fontSize: '14px' }}>
            Forgot Password?
          </Link>
        </p>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
