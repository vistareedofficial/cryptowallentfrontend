// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>About Us</h3>
            <p>Columbia Records is a leading music label...</p>
          </div>
          <div className="footer-center">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="">About</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </div>
          <div className="footer-right">
            <h3>Contact Us</h3>
            <p>Email: info@hsfanclub-columbiarecords.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Columbia Records.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
