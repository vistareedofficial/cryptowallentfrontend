import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Subscriptionservice.css'; // Add this for custom styling

const Subscriptionservice = () => {
  return (
    <div className="crypto-subscription-section">
      <h2 className="text-center mt-4 mb-5">Why Choose VistaReed Crypto?</h2>
      <Row className="justify-content-md-center">
        <Col sm={6} md={4}>
          <Card className="text-center mb-4 crypto-card">
            <Card.Header>Secure Transactions</Card.Header>
            <Card.Body>
              <ul>
                <li>Industry-leading security protocols</li>
                <li>Comprehensive asset management tools</li>
                <li>Quick and simple deposit and withdrawal options</li>
                <li>End-to-end encrypted platform</li>
              </ul>
              <Link to="/"><Button variant="success">Explore Now</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={4}>
          <Card className="text-center mb-4 crypto-card">
            <Card.Header>Real-Time Market Data</Card.Header>
            <Card.Body>
              <ul>
                <li>Live crypto price updates</li>
                <li>Transparent price history</li>
                <li>Instant trade execution</li>
                <li>Smart analytics dashboard</li>
              </ul>
              <Link to="/"><Button variant="success">Start Trading</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={4}>
          <Card className="text-center mb-4 crypto-card">
            <Card.Header>All-in-One Platform</Card.Header>
            <Card.Body>
              <ul>
                <li>Buy, sell, and store multiple coins</li>
                <li>User-friendly mobile interface</li>
                <li>24/7 customer support</li>
                <li>Trusted by global traders</li>
              </ul>
              <Link to="/"><Button variant="success">Get Started</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Subscriptionservice;
