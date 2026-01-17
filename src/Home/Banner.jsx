import React from 'react';
import { motion } from 'framer-motion';
import bannerImg from '../assets/banner1.jpg'; // Ekta best quality image use koro

const Banner = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-[#fdf8f7] overflow-hidden pt-16">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-pink-50/50 -skew-x-12 translate-x-20 z-0 hidden lg:block" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* --- Left Content --- */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-pink-600 font-semibold tracking-[0.2em] uppercase text-sm">
              Trusted Matrimony Service
            </h3>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
              Where <span className="text-pink-600 italic">Hearts</span> <br />
              Meet Destiny
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Join the most trusted platform to find your soulmate. We help you
              connect with people who share your values and culture.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-8 border-y border-pink-100 py-6">
            <div>
              <p className="text-2xl font-bold text-gray-800">10k+</p>
              <p className="text-sm text-gray-500 font-medium">Happy Stories</p>
            </div>
            <div className="w-[1px] bg-pink-100" />
            <div>
              <p className="text-2xl font-bold text-gray-800">100%</p>
              <p className="text-sm text-gray-500 font-medium">
                Verified Profiles
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-pink-200 transition-all hover:-translate-y-1">
              Get Started Free
            </button>
            <button className="border-2 border-gray-200 hover:border-pink-600 text-gray-700 hover:text-pink-600 px-8 py-4 rounded-full font-bold transition-all">
              How it Works
            </button>
          </div>
        </motion.div>

        {/* --- Right Content (Image Section) --- */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Image with Frame */}
          <div className="relative z-10 rounded-[2rem] overflow-hidden border-[12px] border-white shadow-2xl rotate-2">
            <img
              src={bannerImg}
              alt="Happy Couple"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl hidden md:flex items-center gap-3"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">
                Verified Partner
              </p>
              <p className="text-xs text-gray-500">Trusted profiles only</p>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl hidden md:flex items-center gap-3 border-l-4 border-pink-500"
          >
            <p className="text-sm font-bold text-gray-800 font-serif">
              "Best platform for AIUBians"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
