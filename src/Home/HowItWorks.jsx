import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserPlus,
  FaSearch,
  FaUserCheck,
  FaComments,
  FaHeart,
  FaSmile,
} from 'react-icons/fa';
import { Link } from 'react-router';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: 'Create Profile',
      desc: 'Sign up and build your detailed biodata with ease.',
      color: 'from-pink-500 to-rose-400',
    },
    {
      icon: <FaSearch />,
      title: 'Search Profiles',
      desc: 'Filter matches based on your values and interests.',
      color: 'from-rose-500 to-orange-400',
    },
    {
      icon: <FaUserCheck />,
      title: 'Express Interest',
      desc: 'Send a connection request to profiles you like.',
      color: 'from-pink-600 to-pink-400',
    },
    {
      icon: <FaComments />,
      title: 'Start Chatting',
      desc: 'Connect securely through our messaging system.',
      color: 'from-rose-600 to-pink-500',
    },
    {
      icon: <FaHeart />,
      title: 'Build Bond',
      desc: 'Understand compatibility for a lifelong journey.',
      color: 'from-pink-700 to-rose-500',
    },
    {
      icon: <FaSmile />,
      title: 'Find Happiness',
      desc: 'Start your beautiful future together forever.',
      color: 'from-orange-500 to-pink-500',
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-0 text-[10rem] font-serif font-black text-gray-50/50 select-none -z-0 leading-none">
        PROCESS
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-pink-600 font-black tracking-[0.3em] uppercase text-xs mb-3"
          >
            Your Journey Starts Here
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900"
          >
            How It <span className="text-pink-600 italic">Works</span>
          </motion.h2>
          <div className="mt-6 w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Step Number Background */}
              <div className="absolute -top-6 -left-4 text-7xl font-serif font-black text-pink-50 group-hover:text-pink-100 transition-colors duration-500 select-none">
                0{index + 1}
              </div>

              <div className="relative p-10 bg-[#fdf8f7]/60 border border-white rounded-[2.5rem] hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(236,72,153,0.1)] transition-all duration-500">
                {/* Icon Box */}
                <div
                  className={`w-20 h-20 mb-8 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  {step.desc}
                </p>

                {/* Subtle Arrow for Flow (Except last item in row) */}
                <div className="hidden lg:block absolute top-1/2 -right-6 translate-y-[-50%] text-pink-100 text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                  {(index + 1) % 3 !== 0 && (
                    <FaSearch className="rotate-[-45deg] scale-75" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <Link to={'/login'} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-bold text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-rose-400 group-hover:from-pink-500 group-hover:to-rose-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 shadow-xl shadow-pink-100">
            <span className="relative px-10 py-4 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0">
              Create Your Free Account Now
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
