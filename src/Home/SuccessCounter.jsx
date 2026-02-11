import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Users, UserCircle2, Heart, Sparkles, TrendingUp } from 'lucide-react';

const SuccessCounter = () => {
  const stats = [
    {
      id: 1,
      icon: <UserCircle2 className="w-8 h-8" />,
      count: 2500,
      label: 'Female Biodatas',
      accentColor: 'text-rose-500',
      glowColor: 'group-hover:shadow-rose-100',
      bgColor: 'bg-rose-50',
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8" />,
      count: 3000,
      label: 'Male Biodatas',
      accentColor: 'text-blue-500',
      glowColor: 'group-hover:shadow-blue-100',
      bgColor: 'bg-blue-50',
    },
    {
      id: 3,
      icon: <Heart className="w-8 h-8" />,
      count: 1200,
      label: 'Verified Marriages',
      accentColor: 'text-amber-500',
      glowColor: 'group-hover:shadow-amber-100',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="relative py-28 bg-[#FCFBFA] overflow-hidden">
      {/* --- ADVANCED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <TrendingUp className="w-4 h-4 text-rose-500" />
            <span className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em]">
              Live Impact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-medium text-slate-900"
          >
            Our Success in <span className="italic text-rose-600">Numbers</span>
          </motion.h2>

          <p className="mt-6 text-slate-500 font-light max-w-lg mx-auto text-lg leading-relaxed">
            Building a community of trust where thousands have already found
            their meaningful connection.
          </p>
        </div>

        {/* --- COUNTER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`group relative bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] p-12 transition-all duration-500 hover:-translate-y-3 shadow-sm hover:shadow-2xl ${stat.glowColor}`}
            >
              {/* Floating Decorative Sparkle */}
              <div className="absolute top-8 right-8 text-slate-100 group-hover:text-rose-100 transition-colors duration-500">
                <Sparkles size={24} />
              </div>

              {/* Icon Container */}
              <div
                className={`w-20 h-20 mx-auto mb-10 rounded-[2rem] ${stat.bgColor} flex items-center justify-center ${stat.accentColor} transition-all duration-500 group-hover:rotate-[10deg] shadow-inner`}
              >
                {stat.icon}
              </div>

              {/* Number Content */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-5xl lg:text-6xl font-serif font-medium text-slate-900 tracking-tighter">
                    <CountUp
                      end={stat.count}
                      duration={3}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </span>
                  <span className="text-3xl font-light text-rose-500">+</span>
                </div>

                <p className="text-slate-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                  {stat.label}
                </p>
              </div>

              {/* Progress Indicator line */}
              <div className="mt-10 h-[1px] w-full bg-slate-50 relative overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '0%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-40`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
