import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { Quote, Star, Heart, Sparkles } from 'lucide-react';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('https://metrimony-server-ten.vercel.app/success-stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error('Error fetching stories:', err));
  }, []);

  return (
    <section className="py-28 bg-[#FCFBFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Testimonials
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 leading-tight">
              Shared <span className="italic text-rose-600">Beginnings</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-500 font-light text-lg text-center lg:text-right leading-relaxed">
            There is no greater joy for us than seeing two souls unite. Explore
            the journeys of those who found their forever.
          </p>
        </div>
      </div>

      {/* --- Infinite Marquee Section --- */}
      <div className="relative">
        {/* Left & Right Shadow Overlays for smooth fading */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#FCFBFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#FCFBFA] to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover gradient={false} speed={50}>
          {stories.length > 0
            ? stories.map((story, idx) => (
                <div
                  key={story._id || idx}
                  className="group relative bg-white border border-slate-100 rounded-[3rem] p-6 mr-10 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-100/50"
                  style={{ width: '400px' }}
                >
                  {/* Image Container with Floating Badge */}
                  <div className="relative h-72 overflow-hidden rounded-[2.5rem] mb-8 shadow-sm">
                    <img
                      src={story.image}
                      alt="Success Story Couple"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Star className="text-amber-400 w-3 h-3 fill-amber-400" />
                      <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter">
                        Verified Story
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative px-4 pb-4">
                    <Quote className="text-rose-50 w-12 h-12 absolute -top-4 -left-2 -z-0" />

                    <div className="relative z-10">
                      <p className="text-slate-600 font-light leading-relaxed italic mb-8 min-h-[80px]">
                        "{story.review}"
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                            <Sparkles size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                              Union of
                            </p>
                            <p className="text-sm font-bold text-slate-900">
                              #{story.selfBiodataId} & #{story.partnerBiodataId}
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-900 text-white text-[10px] font-bold px-4 py-2 rounded-xl">
                          STORY
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : /* Skeleton Loader while fetching */
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-[400px] h-[500px] bg-slate-100 animate-pulse rounded-[3rem] mr-10"
                />
              ))}
        </Marquee>
      </div>

      {/* --- Success Stats Badge --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 text-center"
      >
        <span className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
          Join <span className="text-rose-600">1,200+</span> Couples who shared
          their happiness
        </span>
      </motion.div>
    </section>
  );
};

export default SuccessStories;
