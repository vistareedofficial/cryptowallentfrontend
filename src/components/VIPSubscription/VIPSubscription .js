import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const VIPSubscription = () => {
  return (
    <div className="container" style={{ marginBottom: '300px' }}>
    <Card className="text-center mb-4" style={{ padding: '50px', height: '100%', marginBottom: '450px' }}>
      <Card.Header>VIP Membership Card - $1,523.8</Card.Header> {/* Include the price */}
      <Card.Body>
        <ul>
          <li>Includes free concert tickets</li>
          <li>Grants access to free meet and greet tickets</li>
          <li>Enjoy a complimentary ride to concerts</li>
          <li>Option to meet with the band or any member of your choice</li>
        </ul>
        <Link to="/PaymentOptionsPage"><Button variant="primary">Pay Now</Button></Link>
      </Card.Body>
    </Card>
    </div>
  );
};

export default VIPSubscription;
