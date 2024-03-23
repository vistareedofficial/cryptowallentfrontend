import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';


const GiftCardPaymentPage = () => {
  // Gift card information
  const giftCardInfo = {
    code: 'GIFT123456789',
    balance: '$50',
  };

  // State to track whether the code has been copied
  const [copied, setCopied] = useState(false);

  // Function to handle copying the gift card code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftCardInfo.code);
    setCopied(true);
    // Reset copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="container" style={{ marginBottom: '450px' }}>
       {/* <Col md={4} className="text-left mt-4">
          <Link to="/PaymentOptionsPage"><Button variant="secondary">Back</Button></Link>
        </Col> */}
      <h2 className="text-center mt-4 mb-4" style={{ fontSize: '24px' }}>Gift Card Payment</h2>
      <div className="text-center" style={{ fontSize: '18px' }}>
        <div className="gift-card-info">
        </div>
        <p style={{ fontSize: '18px' }}>Please send the gift card to <a href="mailto:admin@fanclub-riserecords.com">admin@fanclub-riserecords.com</a>  to process your subscription using a gift card.</p>
        <p style={{ fontSize: '18px' }}>Once the gift card is applied, your order will be processed. Thank You</p>
      </div>
    </div>
  );
};

export default GiftCardPaymentPage;
