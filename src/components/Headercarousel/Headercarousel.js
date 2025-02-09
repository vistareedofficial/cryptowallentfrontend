import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Headercarousel.css'; // Importing the CSS file
import { Button } from 'react-bootstrap';
import harryshouse from "../../Images/harryshouse.jpg";
import { Link } from 'react-router-dom'; // Import Link component
import AuthService from '../AuthService/AuthService'; // Corrected AuthService import

const Carousel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to update login status
    const checkLoginStatus = () => {
      setIsLoggedIn(AuthService.isLoggedIn());
    };

    checkLoginStatus(); // Check when component mounts

    // Subscribe to AuthService login status changes
    const unsubscribe = AuthService.subscribe(checkLoginStatus);

    return () => unsubscribe(); // Unsubscribe on component unmount
  }, []);

  // Slick Carousel Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable navigation arrows
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Set autoplay speed in milliseconds (optional)
  };

  return (
    <div className="container-fluid mb-4">
        <div>
          <img 
            src={harryshouse}
            alt="First slide"
            className="carousel-image"
            style={{ height: '700px' }} // Adjust height as needed
          />
          <div className="text-overlay-container">
            <div className="text-overlay">Harry Styles's</div>
            <div className="text-overlay">Fan Club.</div> 

            {/* Show "Register Today" button only if the user is NOT logged in */}
            {!isLoggedIn && (
              <div className="text-overlay">
                Become a Member! <br/>
                <Link to="/Signup">
                  <Button variant="primary">Register Today</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Carousel;
