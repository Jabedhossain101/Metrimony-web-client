import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router';

const CallToAction = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#FCFBFA]">
      {/* --- REFINED LIGHT MODE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Soft floating orbs for depth */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Card Container with Glassmorphism */}
        <div className="relative bg-white/40 backdrop-blur-xl border border-white rounded-[4rem] p-10 md:p-20 shadow-[0_32px_64px_-16px_rgba(225,29,72,0.05)] overflow-hidden">
          {/* Subtle pattern overlay that works in light mode */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            {/* Animated Heart Icon - Refined for Light Mode */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-rose-50 border border-rose-100 mb-8 group"
            >
              <Heart
                className="w-10 h-10 text-rose-500 transition-transform duration-500 group-hover:scale-110"
                fill="currentColor"
              />
            </motion.div>

            {/* Content Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  The Final Step
                </span>
              </div>

              <h2 className="text-4xl md:text-7xl font-serif font-medium text-slate-900 leading-tight mb-8">
                Ready to Find Your <br />
                <span className="italic text-rose-600">Soulmate?</span>
              </h2>

              <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
                Join a community built on{' '}
                <span className="text-slate-900 font-normal">
                  trust, tradition, and compatibility
                </span>
                . Your journey toward a blessed union is just a few clicks away.
              </p>
            </motion.div>

            {/* Action Buttons - Refined for Light Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/add-biodata"
                className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Biodata Now{' '}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/contact"
                className="px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto"
              >
                Talk to a Matchmaker
              </Link>
            </motion.div>

            {/* Trust Indicators - Updated colors for Light Mode visibility */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-wrap justify-center gap-8"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  100% Privacy
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-rose-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Verified Profiles
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Secure Messaging
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
