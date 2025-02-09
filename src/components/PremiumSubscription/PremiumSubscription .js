import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const PremiumSubscription = () => {
  return (
    <div className="container"  style={{ marginBottom: '450px' }}>

    <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>

      <Card.Header>Premium Membership Card</Card.Header> {/* Include the price */}
      <Card.Body>
      <ul>
          <li>Includes free concert tickets</li>
          <li>Grants access to free meet and greet tickets</li>
          <li>Option to meet with the band or any member of your choice</li>
        </ul>
        Contact us at <strong> info@hsfanclub-columbiarecords.com </strong> for your subscription

        
      </Card.Body>
      
    </Card>
     </div>
  );
};

export default PremiumSubscription;
