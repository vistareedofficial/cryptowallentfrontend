import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="container" style={{ marginBottom: '300px' }}>
      <Card className="text-center mb-4" style={{ padding: '50px', height: '100%', backgroundColor: '#2d2d44', color: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        <Card.Header style={{ backgroundColor: '#1e1e2f', color: '#f0c040' }}>Contact Us</Card.Header>
        <Card.Body>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '18px' }}>
            <li style={{ padding: '6px 0', borderBottom: '1px solid #444' }}>vistareed@outlook.com</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Contact;
