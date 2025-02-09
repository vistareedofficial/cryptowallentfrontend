import React from 'react';
import { Card, Button,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="container" style={{ marginBottom: '300px' }}>
    
    <Card className="text-center mb-4" style={{ padding: '50px', height: '100%' }}>
     
        <br/>
      
        
      <Card.Header>Contact Us</Card.Header> {/* Include the price */}
      <Card.Body>
        <ul>

        info@hsfanclub-columbiarecords.com          
        </ul>
     
        
       
      </Card.Body>
    </Card>
     </div>
  );
};

export default Contact;
