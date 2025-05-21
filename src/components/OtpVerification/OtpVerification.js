import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OtpVerification.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const phoneNumber = localStorage.getItem('phone_number');
  const email = localStorage.getItem('email');  // Retrieve email from localStorage

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text').slice(0, 6).split('');
    if (paste.every((ch) => !isNaN(ch))) {
      const newOtp = [...otp];
      paste.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      inputsRef.current[paste.length - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }

    const referral_code = localStorage.getItem('referral_code');

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('otp_code', enteredOtp);
      formData.append('phone_number', phoneNumber);
      if (referral_code) formData.append('referral_code', referral_code);

      await axios.post(
        'https://info.vistareed.com/users/crypto-user-complete-registration/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess('Verification successful! Redirecting...');
      localStorage.removeItem('phone_number');
      localStorage.removeItem('referral_code');

      setTimeout(() => navigate('/Login'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Verification failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit}>
        <h2>🔐 OTP Verification</h2>
        {email && (
          <p className="otp-message">OTP sent to your email. Check junk if not in inbox.<strong>{email}</strong></p>
        )}

        {error && <div className="otp-error">{error}</div>}
        {success && <div className="otp-success">{success}</div>}

        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              className="otp-box"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
