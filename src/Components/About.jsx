import React from 'react';
import { motion } from 'framer-motion';
import { GiSelfLove } from 'react-icons/gi';
import { FaBullseye, FaShieldAlt, FaUsers } from 'react-icons/fa';
import aboutImage from '../assets/banner1.jpg'; // Ekta sundhor couple ba team image use koro

const About = () => {
  return (
    <div className="bg-[#fdfaf9] min-h-screen">
      {/* --- Hero Section --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-pink-600">
              <GiSelfLove className="text-3xl" />
              <span className="font-black uppercase tracking-[0.3em] text-xs">
                Since 2023
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
              About Soul<span className="text-pink-600 italic">mate</span>
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              We believe that finding a life partner is one of the most
              significant journeys in life. Our platform is dedicated to making
              that journey safe, transparent, and successful.
            </p>
            <div className="pt-4">
              <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-xl shadow-gray-200 hover:shadow-pink-100">
                Explore Our Values
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <img
              src={aboutImage}
              alt="Our Story"
              className="relative z-10 rounded-[3rem] shadow-2xl border-[15px] border-white object-cover h-[500px] w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* --- Mission & Values Section --- */}
      <section className="py-24 bg-white rounded-t-[5rem] shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Our Mission */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 bg-[#fdf8f7] rounded-[3rem] border border-pink-50 space-y-5"
            >
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-100">
                <FaBullseye />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                To empower individuals to find genuine connections through
                advanced technology and personalized matchmaking.
              </p>
            </motion.div>

            {/* Why Choose Us? */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl shadow-gray-50 space-y-5"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-100">
                <FaShieldAlt />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Why Us?
              </h2>
              <ul className="text-gray-500 font-light space-y-3">
                <li className="flex items-center gap-2">✓ Verified Profiles</li>
                <li className="flex items-center gap-2">✓ Secure Messaging</li>
                <li className="flex items-center gap-2">✓ Smart Matching</li>
                <li className="flex items-center gap-2">✓ 24/7 Support</li>
              </ul>
            </motion.div>

            {/* Join Community */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 bg-[#fefce8] rounded-[3rem] border border-yellow-100 space-y-5"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-yellow-100">
                <FaUsers />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Community
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Whether for yourself or a loved one, start your story with a
                community that cares about your future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Aesthetic Footer Callout --- */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-pink-600 to-rose-500 p-16 rounded-[4rem] text-white shadow-2xl shadow-pink-200"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Ready to meet your destiny?
          </h2>
          <p className="text-pink-100 text-lg font-light">
            Join thousands of others who have already found their soulmates.
          </p>
          <button className="bg-white text-pink-600 px-12 py-5 rounded-full font-black tracking-widest text-xs uppercase hover:bg-gray-900 hover:text-white transition-all">
            Register Today
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
