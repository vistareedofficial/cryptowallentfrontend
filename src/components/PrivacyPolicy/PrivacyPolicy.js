import React from 'react';
import { Card } from 'react-bootstrap';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="container privacy-container">
      <Card className="privacy-card">
        <Card.Header className="privacy-header">Privacy Policy</Card.Header>
        <Card.Body>
          <div className="privacy-content">
            <p><strong>Effective Date:</strong> January 1, 2025</p>
            <p><strong>Last Updated:</strong> January 31, 2025</p>

            <h5>1. Introduction</h5>
            <p>
              VistaReed Exchange ("we", "us", or "our") is committed to protecting your personal information and respecting your privacy.
              This Privacy Policy outlines how we collect, use, store, and protect your data when you access or use our platform.
            </p>

            <h5>2. Information We Collect</h5>
            <p>We may collect and process the following types of data:</p>
            <ul>
              <li>Personal Identification Information (e.g. name, email, ID documents)</li>
              <li>Financial Data (wallet addresses, transactions)</li>
              <li>Device and usage information (IP address, browser type)</li>
              <li>Cookies for analytics and performance</li>
            </ul>

            <h5>3. How We Use Your Information</h5>
            <p>We use your data to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process secure transactions</li>
              <li>Detect fraud and comply with legal obligations</li>
              <li>Communicate updates and alerts</li>
            </ul>

            <h5>4. Data Retention and Protection</h5>
            <p>We retain data only as long as necessary and protect it with strong security measures.</p>

            <h5>5. Sharing and Disclosure</h5>
            <p>We do not sell your data. We may share it with legal authorities or trusted service providers when required.</p>

            <h5>6. Geographic Restrictions (EU & Other Jurisdictions)</h5>
            <p><strong>Important:</strong> As of <strong>March 1, 2025</strong>, we will no longer accept user registrations from the <strong>European Union (EU)</strong> or the following restricted jurisdictions:</p>
            <ul>
              <li>Iran</li>
              <li>North Korea</li>
              <li>Cuba</li>
              <li>Russia</li>
              <li>Belarus</li>
              <li>China (Mainland)</li>
              <li>Syria</li>
              <li>Afghanistan</li>
              <li>Myanmar (Burma)</li>
            </ul>
            <p>Accounts found to be operating from these regions will be terminated without notice. Any associated funds may be forfeited and retained at our discretion.</p>
            <p>By using our platform, you acknowledge and accept this geographic policy restriction.</p>

            <h5>7. Your Rights</h5>
            <p>You may have rights to access, update, or delete your data. Contact us at privacy@vistareed.com to exercise your rights.</p>

            <h5>8. Changes to This Policy</h5>
            <p>We may update this policy and notify users accordingly. Continued use indicates acceptance of the changes.</p>

            <h5>9. Contact Us</h5>
            <p>If you have any concerns or questions:</p>
            <ul>
              <li>Email: <a href="mailto:vistareed@outlook.com">vistareed@outlook.com</a></li>
              <li>Website: www.vistareed.com</li>
              <li>Address: 12 Park Lane, Lagos, Nigeria</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
