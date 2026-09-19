import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Hash, ShieldCheck, Heart, Bookmark, X, Star } from 'lucide-react';

const BiodataCard = ({ biodata, onClick }) => {
  const {
    _id,
    name,
    profileImage,
    biodataType,
    permanentDivision,
    age,
    occupation,
    privacySetting
  } = biodata;

  // Mock a match percentage based on the ID for demo purposes
  const mockMatchScore = 70 + (parseInt(_id?.slice(-2) || '0', 16) % 30);
  const isBlurred = privacySetting === 'blurred';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="group relative bg-card rounded-[2.5rem] p-5 shadow-sm border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
    >
      {/* --- Badges --- */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
        <div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border shadow-sm">
          <Hash size={12} className="text-primary" />
          <span className="text-[11px] font-bold text-foreground">
            {_id?.slice(-5)}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
          <ShieldCheck size={12} className="text-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Verified</span>
        </div>
      </div>

      {/* --- Match Score --- */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center justify-center w-11 h-11 bg-background/90 backdrop-blur-md rounded-full border-2 border-primary shadow-sm text-primary font-bold text-xs">
          {mockMatchScore}%
        </div>
      </div>

      {/* --- Profile Image --- */}
      <div 
        className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 cursor-pointer bg-secondary/50 flex items-center justify-center"
        onClick={onClick}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className={`h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ${isBlurred ? 'blur-xl grayscale' : ''}`}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <span className="text-muted-foreground text-sm">No Image</span>
        )}
        
        {isBlurred && profileImage && (
           <div className="absolute inset-0 flex items-center justify-center bg-background/10">
             <ShieldCheck size={40} className="text-white drop-shadow-md opacity-80" />
           </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Type Overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm">
            {biodataType}
          </span>
        </div>
      </div>

      {/* --- Content --- */}
      <div className="space-y-4 px-1 flex-1 flex flex-col cursor-pointer" onClick={onClick}>
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors truncate">
            {name || 'Unknown Name'}
          </h3>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            {age ? `${age} Years Old` : 'Age Not Specified'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 pt-1 mb-2">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-primary">
              <MapPin size={12} />
            </div>
            <span className="text-sm font-medium truncate">{permanentDivision || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-primary">
              <Briefcase size={12} />
            </div>
            <span className="text-sm font-medium truncate">{occupation || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* --- Quick Actions --- */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
        <button className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-primary transition-colors group/btn">
           <Heart size={18} className="group-hover/btn:fill-primary" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Interest</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-amber-500 transition-colors group/btn">
           <Star size={18} className="group-hover/btn:fill-amber-500" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Shortlist</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors">
           <X size={18} />
           <span className="text-[10px] font-bold uppercase tracking-wider">Ignore</span>
        </button>
      </div>
    </motion.div>
  );
};

export default BiodataCard;
