import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import axios from 'axios';
import './SignUp.css'; // Import your custom CSS file for styling

const SignupForm = () => {
  // State variables for form fields and messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!username) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
      return;
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, username: '' }));
    }

    if (!password) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      return;
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    if (!email) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      return;
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, email: '' }));
    }

    if (!phoneNumber) {
      setErrorMessages((prevErrors) => ({ ...prevErrors, phoneNumber: 'Phone Number is required' }));
      return;
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
    }

    // Create user object with form data
    const user = {
      username: username,
      password: password,
      email: email,
      phone_number: phoneNumber,
    };

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post('http://localhost:8000/auth/signup/', user, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed for your CORS configuration
        },
      });

      // Check if 'response' and 'response.data' exist before logging
      if (response && response.data) {
        // Check for the existence of 'message' and 'data' in the response
        if (response.data.message && response.data.data) {
          setSuccessMessage(response.data.message);
          // Clear previous error message
          setErrorMessages({
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
          });
          
          // Redirect to login page after successful signup
          navigate('/Login');
        } else {
          console.log('Unexpected response structure:', response.data);
          setSuccessMessage('');
          setErrorMessages({ ...errorMessages, general: 'Unexpected response structure' });
        }
      } else {
        console.log('Signup successful but no data returned');
        setSuccessMessage('');
        setErrorMessages({ ...errorMessages, general: 'Signup successful but no data returned' });
      }
    } catch (error) {
      // Handle errors (e.g., show error message)
      if (error.response && error.response.data && error.response.data.non_field_errors) {
        setSuccessMessage('');
        setErrorMessages({ ...errorMessages, general: `Error: ${error.response.data.non_field_errors.join(', ')}` });
      } else {
        console.error('Signup failed:', error.message);
        setSuccessMessage('');
        setErrorMessages({ ...errorMessages, general: `Signup failed: ${error.message}` });
      }
    }
  };



  return (
    <div>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {errorMessages.general && <div className="alert alert-danger">{errorMessages.general}</div>}

      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errorMessages.username && <div className="error-message">{errorMessages.username}</div>}
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessages.password && <div className="error-message">{errorMessages.password}</div>}
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {errorMessages.phoneNumber && <div className="error-message">{errorMessages.phoneNumber}</div>}
        </label>
        <br />
        <div style={{ textAlign: 'center' }}>
          <button type="submit" onClick={handleSignup}>
            Signup
          </button>
          <p>
            Already have an account? <Link to="/Login">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
