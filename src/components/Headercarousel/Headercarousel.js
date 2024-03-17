import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Sum41 from "../Images/Sum41.jpg"; // Adjust the path to match your project structure
import sum444 from '../Images/sum444.PNG';
import './Headercarousel.css'; // Importing the CSS file
import summmFlyer from "../../Images/summmFlyer.PNG";
import summmmmmmm from "../../Images/summmmmmmm.jpg";
import { Card, Button, Row, Col } from 'react-bootstrap';
import piecessum41 from '../../Images/piecessum41.jpg';
import landmines from '../../Images/landmines.jpeg';

const Carousel = () => {
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
      <Slider {...settings}>
        <div className="carousel-item">
          <img
            src={Sum41}
            alt="First slide"
            className="carousel-image"
            style={{ height: '700px' }} // Adjust height as needed
          />
          <div className="text-overlay">SUM41</div> {/* Added text overlay */}
        </div>
        <div>
          <img
            src={summmFlyer}
            alt="Second slide"
            className="carousel-image"
            style={{ height: '700px' }} // Match height to the first image
          />
          {/* ... */}
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
