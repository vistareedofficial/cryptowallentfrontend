import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="crypto-footer">
      <div className="crypto-footer-container">
        <div className="crypto-footer-top">
          <div className="crypto-brand">
            <h2>VistaReed Exchange</h2>
            <p>Empowering global finance through crypto. Trade securely and instantly with our all-in-one platform.</p>
          </div>
          <div className="crypto-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="/">Markets</a></li>
              <li><a href="/">Wallet</a></li>
              <li><a href="/">Security</a></li>
              <li><a href="/">Fees</a></li>
            </ul>
          </div>
          <div className="crypto-support">
            <h4>Support</h4>
            <ul>
              <li><a href="/">Help Center</a></li>
              <li><a href="/">Terms of Use</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="crypto-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to get the latest news and market insights.</p>
            <form>
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="crypto-footer-bottom">
          <p>&copy; 2025 VistaReed Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
