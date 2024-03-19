import React from 'react';
import { Card, Button } from 'react-bootstrap';

const VIPSubscription = () => {
  return (
    <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
      <Card.Header>VIP Membership Card - $1,523.8</Card.Header> {/* Include the price */}
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
  );
};

export default VIPSubscription;
