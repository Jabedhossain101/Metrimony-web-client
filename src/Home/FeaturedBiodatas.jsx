import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, User, Star, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const FeaturedBiodatas = () => {
  const navigate = useNavigate();

  const featured = [
    {
      _id: '1',
      name: 'Nusrat Jahan',
      age: '25',
      occupation: 'Doctor',
      image: 'https://i.ibb.co/d483rxhx/image.png',
      location: 'Dhaka',
    },
    {
      _id: '2',
      name: 'Rakib Hasan',
      age: '28',
      occupation: 'Engineer',
      image: 'https://i.ibb.co/vCdbxQLG/image.png',
      location: 'Chittagong',
    },
    {
      _id: '3',
      name: 'Farzana Akter',
      age: '23',
      occupation: 'Student',
      image: 'https://i.ibb.co/d483rxhx/image.png',
      location: 'Sylhet',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/30 skew-x-12 translate-x-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center md:justify-start gap-2 mb-3"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-rose-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Top Picks
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 leading-tight">
              Featured <span className="italic text-rose-600">Spotlight</span>
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-rose-600 transition-colors">
            Explore All Profiles <ArrowUpRight size={16} />
          </button>
        </div>

        {/* --- Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-rose-100/50 group-hover:-translate-y-2">
                {/* Profile Image with Modern Hex/Circle Frame */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-rose-100 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative w-full h-full object-cover rounded-[2rem] border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
                    <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
                  </div>
                </div>

                {/* Info Section */}
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="h-[1px] w-4 bg-rose-200" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Verified Profile
                      </span>
                      <span className="h-[1px] w-4 bg-rose-200" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-4 border-y border-slate-50">
                    <div className="flex items-center gap-2 text-slate-600">
                      <User size={14} className="text-rose-400" />
                      <span className="text-xs font-semibold">
                        {item.age} Years
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={14} className="text-rose-400" />
                      <span className="text-xs font-semibold">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-slate-500 pb-2">
                    <Briefcase size={14} className="text-slate-300" />
                    <span className="text-sm italic">{item.occupation}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/biodata/${item._id}`)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 group-hover:bg-rose-600 group-hover:shadow-lg group-hover:shadow-rose-100"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All (Visible only on small screens) */}
        <div className="mt-12 text-center md:hidden">
          <button className="text-rose-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 mx-auto">
            Explore All Profiles <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBiodatas;
