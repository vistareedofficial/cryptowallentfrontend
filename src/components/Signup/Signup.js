import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignupForm = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const errors = {};
    // Required field validation
    if (!fullname) errors.fullname = 'Fullname is required';
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (!email) errors.email = 'Email is required';
    if (!phoneNumber) errors.phoneNumber = 'Phone Number is required';

    // Password length validation
    if (password && password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // If there are any errors, set them and return
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const user = { fullname, username, password, email, phone_number: phoneNumber };

    setIsLoading(true);
    try {
      const response = await axios.post('https://info.dreglogistics.com/auth/signup/', user, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response?.data?.message) {
        setSuccessMessage(response.data.message);
        setErrorMessages({});

        // Display success message for 3 seconds before redirecting
        setTimeout(() => {
          navigate('/Login');
        }, 3000);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessages({ general: error.response?.data?.message || error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '100px' }}>
      <form onSubmit={handleSignup}>
        <label>
          Full Name:
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          {errorMessages.fullname && <div className="error-message">{errorMessages.fullname}</div>}
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errorMessages.username && <div className="error-message">{errorMessages.username}</div>}
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessages.password && <div className="error-message">{errorMessages.password}</div>}
        </label>
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {errorMessages.phoneNumber && <div className="error-message">{errorMessages.phoneNumber}</div>}
        </label>
        <div style={{ textAlign: 'center' }}>
          {successMessage && (
            <div className="alert alert-success" style={{ color: 'green', marginBottom: '10px' }}>
              {successMessage}
            </div>
          )}
          {errorMessages.general && <div className="alert alert-danger">{errorMessages.general}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Signup'}
          </button>
          <p>Already have an account? <Link to="/Login">Sign In</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
