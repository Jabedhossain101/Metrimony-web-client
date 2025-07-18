import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const Banner = () => {
  return (
    <div className="mt-16">
      {/* Search Bar & Age Filter */}
      <div className="absolute z-10 w-full flex justify-center top-28">
        {/* <form className="bg-white/90 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4 px-6 py-4 max-w-2xl w-full">
          <input
            type="text"
            placeholder="Search by name or keyword"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full md:w-64"
          />
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-sm">Age:</label>
            <input
              type="number"
              min={18}
              max={99}
              placeholder="Min"
              className="w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min={18}
              max={99}
              placeholder="Max"
              className="w-16 border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md px-6 py-2 transition"
          >
            Search
          </button>
        </form> */}
      </div>
      {/* Carousel */}
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
