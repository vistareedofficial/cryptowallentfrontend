import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faBitcoin } from '@fortawesome/free-solid-svg-icons';
import vissa from '../Images/vissa.png'; // Import Visa logo image
import mastercard_logo from '../Images/mastercard_logo.jpg'; // Import Mastercard logo image
import bitcoinLogo from '../Images/bitcoin_logo.png'; // Import Bitcoin logo image
import giftCard1Logo from '../Images/gift_card_1_logo.png'; // Import Gift card 1 logo image
import giftCard2Logo from '../Images/gift_card_1_logo.png'; // Import Gift card 2 logo image

const PaymentOptionsPage = () => {
  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Payment Options</h2>
      <Row className="justify-content-center">
        {/* Credit/Debit Card */}
        <Col sm={6} md={4} className="d-flex flex-column align-items-center">
          <Card className="text-center mb-4">
            <Card.Body>
              {/* <FontAwesomeIcon icon={faCreditCard} size="3x" className="mb-3" /> */}
              <h4>Credit/Debit Card</h4>
              <img src={vissa} alt="Visa Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
              <img src={mastercard_logo} alt="Mastercard Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
            </Card.Body>
          </Card>
          <Button variant="primary">Pay Now</Button>
          <br/>
          <br/>
          <br/>
        </Col>
        {/* Bitcoin */}
        <Col sm={6} md={4} className="d-flex flex-column align-items-center">
          <Card className="text-center mb-4">
            <Card.Body>
              {/* <FontAwesomeIcon icon={faBitcoin} size="3x" className="mb-3" /> */}
              <h4>Bitcoin</h4>
              <img src={bitcoinLogo} alt="Bitcoin Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
            </Card.Body>
          </Card>
          <Button variant="primary">Pay Now</Button>
          <br/>
          <br/>
          <br/>
        </Col>
        {/* Gift Cards */}
        <Col sm={6} md={4} className="d-flex flex-column align-items-center">
          <Card className="text-center mb-4">
            <Card.Body>
              <h4>Gift Cards</h4>
              <img src={giftCard1Logo} alt="Gift Card 1 Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
              <img src={giftCard2Logo} alt="Gift Card 2 Logo" className="payment-logo" style={{ maxWidth: '100px' }} />
            </Card.Body>
          </Card>
          <Button variant="primary">Pay Now</Button>
        </Col>
      </Row>
      <br/>
          <br/>
          <br/>
    </div>
  );
};

export default PaymentOptionsPage;
