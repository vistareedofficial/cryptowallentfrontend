import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../AuthService/AuthService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize isLoggedIn state to false
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        AuthService.setTokens(data.tokens); // Set access token
        setIsLoggedIn(true); // Update isLoggedIn state to true after successful login
        setResponseMessage(data.message || 'Login successful!');
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        console.error('Login failed:', data);
        setResponseMessage(`Login failed. ${data.message || 'Please try again later.'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container" style={{ marginBottom: '100px' }}>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
        <br />

        {/* Display response message */}
        {responseMessage && <p className="response-message">{responseMessage}</p>}

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
