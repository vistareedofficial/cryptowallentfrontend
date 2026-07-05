import React from 'react';
import { Card } from 'react-bootstrap';

const Contact = () => {
  return (
    <div 
      className="container" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center',  // Centers horizontally
        alignItems: 'center',      // Centers vertically
        minHeight: '80vh',         // Uses 80% of screen height to offset navbars/footers
        marginBottom: '100px'      // Reduced margin since flexbox handles positioning
      }}
    >
      <Card 
        className="text-center" 
        style={{ 
          padding: '50px', 
          width: '100%',
          maxWidth: '500px',       // Prevents the card from stretching too wide
          backgroundColor: '#2d2d44', 
          color: '#fff', 
          borderRadius: '8px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' 
        }}
      >
        <Card.Header style={{ backgroundColor: '#1e1e2f', color: '#f0c040', fontSize: '20px' }}>
          Contact Us
        </Card.Header>
        <Card.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '18px', margin: 0 }}>
            <li style={{ padding: '6px 0', borderBottom: '1px solid #444' }}>
              <a href="mailto:vistareedofficial@proton.me" style={{ color: '#fff', textDecoration: 'none' }}>
                vistareedofficial@proton.me
              </a>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Contact;
