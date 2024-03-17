import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Subscriptionservice = () => {
  return (
    <div className="container mb-4"> {/* Added mb-4 class for bottom margin */}
      <h2 className="text-center mt-4 mb-4">Membership Subscription</h2>
      <Row className="justify-content-md-center">
        <Col sm={6} md={4}>
          <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
            <Card.Header>Regular Membership Card</Card.Header>
            <Card.Body>
              <ul>
                <li>No free concert tickets</li>
                <li>Does not Grants access to free meet and greet tickets</li>
                <li>Wil not Enjoy a complimentary ride to concerts</li>
                <li>No Option to meet with the band or any member of your choice</li>
              </ul>
              <Button variant="primary">Subscribe</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={4}>
          <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
            <Card.Header>Premium Membership Card</Card.Header>
            <Card.Body>
              <ul>
                <li>Includes free concert tickets</li>
                <li>Grants access to free meet and greet tickets</li>
                <li>Enjoy a complimentary ride to concerts</li>
                <li>Option to meet with the band or any member of your choice</li>
              </ul>
              <Button variant="primary">Subscribe</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={4}>
          <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
            <Card.Header>VIP Membership Card</Card.Header>
            <Card.Body>
              <ul>
                <li>Includes free concert tickets</li>
                <li>Grants access to free meet and greet tickets</li>
                <li>Enjoy a complimentary ride to concerts</li>
                <li>Option to meet with the band or any member of your choice</li>
              </ul>
              <Button variant="primary">Subscribe</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Subscriptionservice;
