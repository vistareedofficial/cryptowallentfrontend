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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await fetch('https://cryptoexchanebackend-cvrq.onrender.com/auth/login/crypto-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        AuthService.setTokens(data.access_token, data.refresh_token);
        console.log('Tokens Set:', data.access_token, data.refresh_token);
        setSuccessMessage(data.message || 'Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        // Display backend error message or default fallback
        if (data?.detail) {
          setError(data.detail);
        } else if (data?.message) {
          setError(data.message);
        } else {
          setError('Login failed. Please try again.');
        }
      }
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

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ paddingRight: '60px', width: '100%' }}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              color: '#555',
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;