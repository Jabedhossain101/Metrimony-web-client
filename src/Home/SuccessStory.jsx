import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('https://metrimony-server-ten.vercel.app/success-stories')
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-pink-600 font-black tracking-[0.4em] uppercase text-[10px]"
            >
              Real Connections
            </motion.h3>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
              Happy <span className="text-pink-600 italic">Stories</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-500 font-light leading-relaxed">
            Discover the journeys of couples who found their soulmates through
            our platform. Their happiness is our greatest achievement.
          </p>
        </div>
      </div>

      {/* --- Infinite Marquee Section --- */}
      <div className="relative">
        {/* Left & Right Gradient Overlays for smooth fading */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <Marquee pauseOnHover gradient={false} speed={40}>
          {stories.map(story => (
            <div
              key={story._id}
              className="group relative bg-[#fdf8f7]/50 border border-white rounded-[2.5rem] p-6 mr-10 flex-shrink-0 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_50px_rgba(236,72,153,0.1)]"
              style={{ width: '380px' }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden rounded-[2rem] mb-6 shadow-md">
                <img
                  src={story.image}
                  alt="Couple"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-[10px]" />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div className="relative px-2">
                <FaQuoteLeft className="text-pink-100 text-4xl absolute -top-4 -left-2 -z-0" />

                <div className="relative z-10">
                  <p className="text-gray-700 font-medium leading-relaxed italic mb-6 line-clamp-3">
                    "{story.review}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-pink-50">
                    <div>
                      <p className="text-xs font-black text-pink-600 uppercase tracking-widest mb-1">
                        Couple IDs
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {story.selfBiodataId} & {story.partnerBiodataId}
                      </p>
                    </div>
                    <div className="bg-pink-100 p-3 rounded-2xl text-pink-600">
                      <FaStar className="animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default SuccessStories;
