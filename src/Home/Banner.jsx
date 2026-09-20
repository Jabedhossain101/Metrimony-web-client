import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Search, Star, ArrowRight, ShieldCheck, Sparkles, MapPin, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import bannerImg from '../assets/banner1.jpg';

const Banner = () => {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, -60]);
  const yCard = useTransform(scrollY, [0, 500], [0, 40]);
  const navigate = useNavigate();

  // Widget state
  const [lookingFor, setLookingFor] = useState('female');
  const [ageFrom, setAgeFrom] = useState('20');
  const [ageTo, setAgeTo] = useState('30');
  const [religion, setReligion] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams({
      type: lookingFor,
      minAge: ageFrom,
      maxAge: ageTo,
    });
    if (religion) params.append('sect', religion);
    navigate(`/biodata?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden flex items-center pt-24 pb-20 lg:py-0">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* --- LEFT CONTENT (Span 7) --- */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-card px-4 py-1.5 rounded-full shadow-sm border border-border"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-[4px]">
              The Gold Standard
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif font-medium text-foreground leading-[1.1] tracking-tight">
              Crafting Your <br />
              <span className="italic font-light text-primary">
                Eternal
              </span>{' '}
              Story
            </h1>
            <p className="mt-6 text-muted-foreground text-lg md:text-xl font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience a bespoke matchmaking journey where
              <span className="text-foreground font-normal">
                {' '}
                tradition meets modern compatibility
              </span>
              . Find your perfect reflection today.
            </p>
          </motion.div>

          {/* QUICK MATCH WIDGET */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-card/80 backdrop-blur-md border border-border p-4 rounded-3xl shadow-lg max-w-2xl mx-auto lg:mx-0 flex flex-col md:flex-row items-center gap-3"
          >
            <div className="flex-1 w-full bg-secondary/50 rounded-2xl px-4 py-3 border border-transparent focus-within:border-primary/30 flex items-center gap-2">
               <User size={18} className="text-primary" />
               <select 
                 value={lookingFor}
                 onChange={(e) => setLookingFor(e.target.value)}
                 className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none appearance-none cursor-pointer"
               >
                 <option value="female">Looking for a Bride</option>
                 <option value="male">Looking for a Groom</option>
               </select>
            </div>
            
            <div className="flex-1 w-full bg-secondary/50 rounded-2xl px-4 py-3 border border-transparent focus-within:border-primary/30 flex items-center gap-2">
               <span className="text-primary font-bold text-sm">Age</span>
               <div className="flex items-center gap-1 w-full">
                 <input 
                   type="number" 
                   value={ageFrom} 
                   onChange={(e) => setAgeFrom(e.target.value)} 
                   className="w-full bg-transparent text-sm font-semibold text-foreground text-center focus:outline-none" 
                 />
                 <span className="text-muted-foreground">-</span>
                 <input 
                   type="number" 
                   value={ageTo} 
                   onChange={(e) => setAgeTo(e.target.value)} 
                   className="w-full bg-transparent text-sm font-semibold text-foreground text-center focus:outline-none" 
                 />
               </div>
            </div>

            <button 
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl font-bold transition-all hover:bg-primary/90 shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2"
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-8 border-t border-border"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">4.9</span>
                <div className="flex text-accent">
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                Global Rating
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-border" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">12k+</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                Active Members
              </span>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-border" />
            <div className="flex flex-col">
              <span className="text-emerald-600 flex items-center gap-1 text-sm font-bold uppercase">
                <ShieldCheck size={16} /> Secure
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                Privacy First
              </span>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT VISUAL (Span 5) --- */}
        <motion.div
          style={{ y: yImage }}
          className="lg:col-span-5 relative flex justify-center items-center mt-12 lg:mt-0"
        >
          {/* Main Image Container */}
          <div className="relative z-10 w-full max-w-[380px] aspect-[4/5.5] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-card">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={bannerImg}
              className="w-full h-full object-cover"
              alt="Premium Couple"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          </div>

          {/* Floating UI Card: Match Percentage */}
          <motion.div
            style={{ y: yCard }}
            className="absolute -right-4 top-1/4 z-20 bg-card/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-border flex flex-col items-center gap-1 w-28"
          >
            <div className="p-2 bg-primary/10 rounded-2xl">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
              Compatibility
            </p>
            <p className="text-xl font-serif font-bold text-foreground">98%</p>
          </motion.div>

          {/* Floating UI Card: Location Label */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-4 z-20 bg-card p-4 rounded-2xl shadow-lg border border-border flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
              <Search className="w-5 h-5 text-background" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                Location
              </p>
              <p className="text-sm font-bold text-foreground">Dhaka, BD</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
