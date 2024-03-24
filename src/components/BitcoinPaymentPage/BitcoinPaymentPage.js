import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BitcoinPaymentPage = () => {
  // Generate a random Bitcoin address for demonstration purposes
  const bitcoinAddress = '1MCqMi9hA6UALoBHsU5BNTUKq7mTb4LvFV';

  // State to track whether the address has been copied
  const [copied, setCopied] = useState(false);

  // Function to handle copying the Bitcoin address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    setCopied(true);
    // Reset copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="container">
         {/* <Col md={4} className="text-left mt-4">
          <Link to="/PaymentOptionsPage"><Button variant="secondary">Back</Button></Link>
        </Col> */}
      <h2 className="text-center mt-4 mb-4">Bitcoin Payment</h2>
      <div className="text-center">
        <p>Please send your payment to the following Bitcoin address:</p>
        <div className="bitcoin-address">
          <span>{bitcoinAddress}</span> <br/>
          <button className="btn-copy" onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p>Once the payment is confirmed, your order will be processed.</p>
      </div>
      <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/><br/>
          
          <br/>
        </div>
    </div>
  );
};

export default BitcoinPaymentPage;
