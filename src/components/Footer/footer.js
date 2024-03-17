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
            <p>Rise Records is a leading music label...</p>
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
            <p>Email: info@fanclub-riserecords.com</p>
            {/* <p>Phone: +1 (123) 456-7890</p> */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Rise Records</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
