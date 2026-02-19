import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, User, Hash, ArrowRight } from 'lucide-react';

const BiodataCard = ({ biodata }) => {
  const {
    _id,
    name,
    profileImage,
    biodataType,
    permanentDivision,
    age,
    occupation,
  } = biodata;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300"
    >
      {/* --- ID Badge --- */}
      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 shadow-sm">
          <Hash size={12} className="text-rose-500" />
          <span className="text-[11px] font-bold text-slate-600">
            {_id.slice(-5)}
          </span>
        </div>
      </div>

      {/* --- Profile Image --- */}
      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6">
        <img
          src={profileImage}
          alt={name}
          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type Overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
            {biodataType}
          </span>
        </div>
      </div>

      {/* --- Content --- */}
      <div className="space-y-4 px-1">
        <div>
          <h3 className="text-xl font-serif font-medium text-slate-900 group-hover:text-rose-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-400 font-light mt-1 flex items-center gap-1">
            {age} Years Old
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2">
          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-rose-500">
              <MapPin size={14} />
            </div>
            <span className="text-sm font-light">{permanentDivision}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-rose-500">
              <Briefcase size={14} />
            </div>
            <span className="text-sm font-light">{occupation}</span>
          </div>
        </div>

        {/* --- Action Button --- */}
        <Link
          to={`/biodata/${_id}`}
          className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-medium flex items-center justify-center gap-2 group-hover:bg-rose-600 transition-all duration-300 shadow-sm overflow-hidden relative"
        >
          <span className="relative z-10">View Full Profile</span>
          <ArrowRight
            size={16}
            className="relative z-10 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default BiodataCard;
