import React from 'react';
import { FaHeart } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="max-w-7xl mx-auto my-16 px-4 py-12 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl shadow-2xl flex flex-col items-center text-center">
      <FaHeart className="text-5xl text-pink-500 mb-4 animate-pulse" />
      <h2 className="text-3xl font-bold text-pink-700 mb-3">
        Ready to Find Your Soulmate?
      </h2>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl">
        Join thousands of happy couples who found their perfect match on Soulmate. Create your profile today and take the first step towards a beautiful journey together!
      </p>
      <a
        href="/register"
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg"
      >
        Register Biodata now
      </a>
    </section>
  );
};
export default CallToAction;