import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PasswordResetRequest.css';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await axios.post(
        'http://127.0.0.1:8000/users/password-reset/request',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      setSuccess('A reset code has been sent to your email.');
      setTimeout(() => {
        navigate('/PasswordResetVerify', { state: { email } });
      }, 1500);
    } catch (err) {
      const data = err.response?.data;

      if (!data) {
        setError('An unexpected error occurred. Please try again.');
        return;
      }

      // Display multiple possible errors
      if (typeof data.detail === 'string') {
        setError(data.detail);
      } else if (Array.isArray(data.detail)) {
        setError(data.detail.join(' '));
      } else if (data.email && Array.isArray(data.email)) {
        setError(data.email.join(' '));
      } else {
        setError('Failed to request password reset.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit}>
        <h2>🔐 Request Password Reset</h2>
        <p className="otp-message">Enter your email to receive a reset code</p>

        {error && <div className="otp-error">{error}</div>}
        {success && <div className="otp-success">{success}</div>}

        <div className="otp-inputs">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="otp-box"
            style={{ width: '100%', maxWidth: '300px' }}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Code'}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
