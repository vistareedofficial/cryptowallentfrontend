import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PasswordResetVerify.css';

const PasswordResetVerify = () => {
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !otpCode) {
      setError('OTP code is required.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('otp_code', otpCode);

      const response = await axios.post(
        'https://cryptoexchanebackend-cvrq.onrender.com/auth/password-reset/verify-otp',
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (response.status === 200) {
        navigate('/PasswordReset', { state: { email, otpCode } });
      } else {
        setError('OTP verification failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.otp_code?.[0] ||
        'OTP verification failed.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit}>
        <h2>🔐 Verify OTP</h2>
        <p className="otp-message">Enter the OTP code sent to your email, Check junk if not in inbox.</p>

        {error && <div className="otp-error">{error}</div>}

        <input
          type="hidden"
          value={email}
          readOnly
        />

        <input
          type="text"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          placeholder="Enter OTP Code"
          required
          style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetVerify;
