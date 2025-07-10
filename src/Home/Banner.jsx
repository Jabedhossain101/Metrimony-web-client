import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const Banner = () => {
  return (
    <div className="mt-16">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={3000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        <div>
          <img
            src={banner1}
            alt="Happy Couple 1"
            className="h-[70vh] object-cover w-full"
          />
          <p className="legend">Find Your Perfect Match</p>
        </div>
        <div>
          <img
            src={banner2}
            alt="Happy Couple 2"
            className="h-[70vh] object-cover w-full"
          />
          <p className="legend">Trusted Matrimony Service</p>
        </div>
        <div>
          <img
            src={banner3}
            alt="Happy Couple 3"
            className="h-[70vh] object-cover w-full"
          />
          <p className="legend">Join Thousands of Success Stories</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
