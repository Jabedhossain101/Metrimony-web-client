import React from 'react';
import { FaFemale, FaMale, FaRing } from 'react-icons/fa';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const SuccessCounter = () => {
  const stats = [
    {
      id: 1,
      icon: <FaFemale />,
      count: 2500,
      label: 'Girls Biodata',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-100',
    },
    {
      id: 2,
      icon: <FaMale />,
      count: 3000,
      label: 'Boys Biodata',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      id: 3,
      icon: <FaRing />,
      count: 1200,
      label: 'Marriages Completed',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
  ];

  return (
    <section className="relative py-24 bg-[#fdfaf9] overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-100/40 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-pink-600 font-black tracking-[0.3em] uppercase text-[10px] mb-3"
          >
            Our Impact
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
          >
            Our Success in <span className="text-pink-600 italic">Numbers</span>
          </motion.h2>
          <div className="mt-5 w-20 h-1 bg-pink-600 mx-auto rounded-full"></div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative group bg-white/70 backdrop-blur-md border ${stat.borderColor} rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 text-center`}
            >
              {/* Icon Container with Shape */}
              <div
                className={`relative w-24 h-24 mx-auto mb-8 flex items-center justify-center text-4xl ${stat.color} transition-transform duration-500 group-hover:scale-110`}
              >
                <div
                  className={`absolute inset-0 ${stat.bgColor} rounded-full opacity-60 group-hover:rotate-45 transition-transform duration-700`}
                ></div>
                <div className="relative z-10">{stat.icon}</div>
              </div>

              {/* Number with CountUp */}
              <div className="space-y-2">
                <h4 className="text-5xl font-serif font-bold text-gray-900 flex items-center justify-center">
                  <CountUp
                    end={stat.count}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  <span className="text-pink-600 ml-1">+</span>
                </h4>
                <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">
                  {stat.label}
                </p>
              </div>

              {/* Decorative Line */}
              <div className="mt-8 mx-auto w-12 h-0.5 bg-gray-100 group-hover:w-20 group-hover:bg-pink-200 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
