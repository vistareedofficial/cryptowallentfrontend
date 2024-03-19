import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PremiumSubscription = () => {
  return (
    <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
      <Card.Header>Premium Membership Card - $1,115.2</Card.Header> {/* Include the price */}
      <Card.Body>
        <ul>
          <li>Provides access to meet and greet tickets</li>
          <li>Option to meet with the band or any member of your choice</li>
        </ul>
        <Button variant="primary">Subscribe</Button>
      </Card.Body>
    </Card>
  );
};

export default PremiumSubscription;
