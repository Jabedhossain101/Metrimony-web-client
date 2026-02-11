import React from 'react';
import { Link, Outlet } from 'react-router';
import loveImg from '../../assets/Alean.json';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf9] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/50 rounded-full blur-[120px] -z-0"></div>

      {/* --- Floating "Back to Home" Button --- */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          to={'/'}
          className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-white shadow-sm rounded-2xl text-gray-700 font-bold hover:bg-pink-600 hover:text-white transition-all duration-300 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>

      {/* --- Main Auth Container --- */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full bg-white/40 backdrop-blur-xl border border-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(236,72,153,0.1)] overflow-hidden z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[700px]">
          {/* --- Left Side: Animation & Branding --- */}
          <div className="flex-1 w-full bg-gradient-to-br from-pink-50/50 to-white/20 p-12 flex flex-col items-center justify-center relative">
            {/* Soft Overlay Text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Soulmate Awaits
              </h2>
              <p className="text-gray-500 font-light italic">
                "Every heart has a story, let's find yours."
              </p>
            </div>

            <div className="w-full max-w-md drop-shadow-2xl">
              <Lottie animationData={loveImg} loop={true} />
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-10 w-24 h-1 bg-pink-200 rounded-full"></div>
          </div>

          {/* --- Right Side: Outlet (Login/Register Form) --- */}
          <div className="flex-1 w-full p-8 md:p-16 lg:p-20 bg-white">
            <div className="max-w-md mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- Simple Footer Info --- */}
      <div className="mt-8 text-gray-400 text-xs font-medium tracking-widest uppercase">
        Safe • Secure • Verified
      </div>
    </div>
  );
};

export default AuthLayout;
