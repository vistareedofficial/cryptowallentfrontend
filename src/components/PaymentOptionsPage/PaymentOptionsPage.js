import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import vissa from '../Images/vissa.png';
import mastercard_logo from '../Images/mastercard_logo.jpg';
import bitcoinLogo from '../Images/bitcoin_logo.png';
import giftCard1Logo from '../Images/gift_card_1_logo.png';
import giftCard2Logo from '../Images/gift_card_1_logo.png';
import { Link } from 'react-router-dom';

const PaymentOptionsPage = () => {
  return (
    <div className="container" style={{ marginBottom: '450px' }}>
      <h2 className="text-center mt-4 mb-4">Payment Options</h2>
      <Row className="justify-content-center">
        {/* Credit/Debit Card */}
        <Col sm={6} md={4} className="d-flex flex-column align-items-center">
          <Card className="text-center mb-4">
            <Card.Body>
              <h4>Credit/Debit Card</h4>
              <img src={vissa} alt="Visa Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
              <img src={mastercard_logo} alt="Mastercard Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
            </Card.Body>
            <Link to="/CreditCardInputPage"><Button variant="primary">Pay Now</Button></Link>
          </Card>
        </Col>
        {/* Bitcoin */}
        <Col sm={6} md={4} className="d-flex flex-column align-items-center">
          <Card className="text-center mb-4">
            <Card.Body>
              <h4>Bitcoin</h4>
              <img src={bitcoinLogo} alt="Bitcoin Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
            </Card.Body>
            <Link to="/BitcoinPaymentPage"><Button variant="primary">Pay Now</Button></Link>
          </Card>
        </Col>
        {/* Gift Cards */}
        <Col sm={6} md={4} className="d-flex flex-column align-items-center">
          <Card className="text-center mb-4">
            <Card.Body>
              <h4>Gift Cards</h4>
              <img src={giftCard1Logo} alt="Gift Card 1 Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
              <img src={giftCard2Logo} alt="Gift Card 2 Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
            </Card.Body>
            <Link to="/GiftCardPaymentPage"><Button variant="primary">Pay Now</Button></Link>
          </Card>
        </Col>
      </Row>
      {/* Contact Information */}
      <Row className="justify-content-center mt-4">
        <Col xs={12} className="text-center">
          <h4>Contact admin at admin@fanclub-riserecords.com for installmental payment</h4>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentOptionsPage;
