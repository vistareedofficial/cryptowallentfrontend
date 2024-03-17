// Latest.js
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './Latest.css'; // Import your CSS file

const Latest = () => {
  return (
    <div className="container-spacing"> {/* Added a class for spacing */}
      <h2 className="text-center mt-4 mb-4">Latest Releases</h2>
      <Row className="justify-content-md-center">
        <Col sm={6} md={3}>
          <Card id='cc-card1' className="text-center mb-4" style={{ padding: '50px', height: '100%', backgroundColor: '#A52A2A', color: 'white' }}>
            <Card.Header style={{ backgroundColor: '#D2B48C' }}>Album - Heaven X Hell</Card.Header>
            <Card.Body>
              <Card.Title id='Landmines'>Landmines</Card.Title>
              {/* <Button variant="light">Buy Now</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card id='cc-card2' className="text-center mb-4" style={{ padding: '50px', height: '100%', backgroundColor: '#A52A2A', color: 'white' }}>
            <Card.Header style={{ backgroundColor: '#D2B48C' }}>Album - Heaven X Hell</Card.Header>
            <Card.Body>
              <Card.Title id='Landmines'>Time Won't Wait</Card.Title>
              {/* <Button variant="light">Buy Now</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card id='cc-card3' className="text-center mb-4" style={{ padding: '50px', height: '100%', backgroundColor: '#A52A2A', color: 'white' }}>
            <Card.Header style={{ backgroundColor: '#D2B48C' }}>Album - Heaven X Hell</Card.Header>
            <Card.Body>
              <Card.Title id='Landmines'>I Can't Wait</Card.Title>
              {/* <Button variant="light">Buy Now</Button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={3}>
          <Card id='cc-card4' className="text-center mb-4" style={{ padding: '50px', height: '100%', backgroundColor: '#A52A2A', color: 'white' }}>
            <Card.Header style={{ backgroundColor: '#D2B48C' }}>Album - Heaven X Hell</Card.Header>
            <Card.Body>
              <Card.Title id='Landmines'>Dopamine</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className='blackdiv'>
      <h3>Stay Updated</h3>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

      </div>
    </div>
  );
};

export default Latest;
