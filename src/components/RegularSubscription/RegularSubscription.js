import React from 'react';
import { Card, Button,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegularSubscription = () => {
  return (
    <div className="container" style={{ marginBottom: '300px' }}>
    
    <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
     
        <br/>
      
        
      <Card.Header>Regular Membership Card</Card.Header> {/* Include the price */}
      <Card.Body>
        <ul>
          <ul>
                <li>No free concert tickets</li>
                <li>Does not Grant access to free meet and greet tickets</li>
                <li>Will not Enjoy a complimentary ride to concerts</li>
                <li>No Option to meet with the band or any member of your choice</li>
              </ul>
        </ul>
        {/* <Link to="/PaymentOptionsPage" >
          <Button variant="primary">Subscribe</Button>
        </Link> */}
      Contact us at <strong>info@hsfanclub-columbiarecords.com </strong> for your subscription
       
      </Card.Body>
    </Card>
     </div>
  );
};

export default RegularSubscription;
