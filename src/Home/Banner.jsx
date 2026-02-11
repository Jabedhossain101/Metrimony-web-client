import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Search,
  Star,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import bannerImg from '../assets/banner1.jpg';

const Banner = () => {
  const { scrollY } = useScroll();
  // Smoother parallax offsets
  const yImage = useTransform(scrollY, [0, 500], [0, -60]);
  const yCard = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <div className="relative min-h-screen w-full bg-[#FDFCFB] overflow-hidden flex items-center py-20 lg:py-0">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* --- LEFT CONTENT (Span 7) --- */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100"
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[4px]">
              The Gold Standard
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif font-medium text-slate-900 leading-[1.1] tracking-tight">
              Crafting Your <br />
              <span className="italic font-light text-rose-600">
                Eternal
              </span>{' '}
              Story
            </h1>
            <p className="mt-6 text-slate-500 text-lg md:text-xl font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience a bespoke matchmaking journey where
              <span className="text-slate-800 font-normal">
                {' '}
                tradition meets modern compatibility
              </span>
              . Find your perfect reflection today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <button className="px-8 py-4 bg-rose-600 text-white rounded-full font-semibold transition-all hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-200 flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-50 transition-all">
              View Success Stories
            </button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-8 border-t border-slate-100"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-slate-900">4.9</span>
                <div className="flex text-amber-400">
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                Global Rating
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">12k+</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                Active Members
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-rose-600 flex items-center gap-1 text-sm font-bold uppercase">
                <ShieldCheck size={16} /> Secure
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                Privacy First
              </span>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT VISUAL (Span 5) --- */}
        <motion.div
          style={{ y: yImage }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          {/* Main Image Container - Size Reduced for Professional Look */}
          <div className="relative z-10 w-full max-w-[380px] aspect-[4/5.5] rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={bannerImg}
              className="w-full h-full object-cover"
              alt="Premium Couple"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>

          {/* Floating UI Card: Match Percentage */}
          <motion.div
            style={{ y: yCard }}
            className="absolute -right-4 top-1/4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-rose-50 flex flex-col items-center gap-1 w-28"
          >
            <div className="p-2 bg-rose-50 rounded-2xl">
              <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Compatibility
            </p>
            <p className="text-xl font-serif font-bold text-slate-900">98%</p>
          </motion.div>

          {/* Floating UI Card: Location Label */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-4 z-20 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Location
              </p>
              <p className="text-sm font-bold text-slate-800">Dhaka, BD</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
