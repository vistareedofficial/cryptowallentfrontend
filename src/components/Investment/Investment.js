import React from 'react';
import { Card } from 'react-bootstrap';
import './Investment.css';

const Investment = () => {
  return (
    <div className="container investment-container">
      <Card className="investment-card">
        <Card.Header className="investment-header">Investment Plans</Card.Header>
        <Card.Body>
          <div className="investment-content">
            <h5>Minimum Investment Requirement</h5>
            <p>
              To participate in our investment program, the <strong>minimum starting amount is 2000 USDT</strong>.
              In addition, the <strong>minimum investment time is one week</strong>.
            </p>

            <h5>Why 2000 USDT?</h5>
            <p>
              This requirement ensures stability, proper risk management, and access to higher-quality investment opportunities 
              within the crypto and blockchain markets.
            </p>

            <h5>Getting Started</h5>
            <ul>
              <li>Deposit a minimum of 2000 USDT into your account</li>
              <li>Choose your preferred investment option</li>
              <li>Keep your funds invested for at least one week</li>
              <li>Track your growth via your dashboard</li>
            </ul>

            <h5>Note</h5>
            <p>
              Investments below 2000 USDT or withdrawn before one week will not qualify for our managed programs.
              For questions or assistance, please reach out to our support team.
            </p>

            <h5>Contact Support</h5>
            <ul>
              <li>Email: <a href="mailto:vistareed@outlook.com">vistareed@outlook.com</a></li>
              <li>Website: www.vistareed.com</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Investment;
