import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

const CryptoSignup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    user_name: '',
    phone_number: '',
    email: '',
    password: '',
    referral_code: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/users/pre-register/crypto-user/new/',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (res?.data) {
        localStorage.setItem('phone_number', formData.phone_number);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('referral_code', formData.referral_code);

        setSuccessMessage('Signup successful! Redirecting to OTP verification...');
        setTimeout(() => navigate('/OtpVerification'), 3000);
      }
    } catch (err) {
      const errorDetail = err.response?.data?.detail;

      if (typeof errorDetail === 'string') {
        setError(errorDetail);
      } else if (Array.isArray(errorDetail)) {
        setError(errorDetail.map(e => e.msg).join(', '));
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crypto-signup-container">
      <form className="crypto-signup-form" onSubmit={handleSubmit}>
        <h2>🚀 Create Your Crypto Account</h2>

        {error && <div className="crypto-error">{error}</div>}
        {successMessage && <div className="crypto-success">{successMessage}</div>}

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="user_name"
          placeholder="Username"
          value={formData.user_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
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

        {/* Optional referral code field */}
        {/* <input
          type="text"
          name="referral_code"
          placeholder="Referral Code (optional)"
          value={formData.referral_code}
          onChange={handleChange}
        /> */}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className="privacy-agreement">
          By signing up on our platform, you agree to our <Link to="/PrivacyPolicy">Privacy Policy</Link>.
        </p>

        <p>Already have an account? <Link to="/Login">Login</Link></p>
      </form>
    </div>
  );
};

export default CryptoSignup;
