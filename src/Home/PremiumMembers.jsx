import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  Calendar,
  ChevronRight,
  Crown,
  ArrowUpDown,
} from 'lucide-react';

const PremiumMembers = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');

  const members = [
    {
      _id: '101',
      name: 'Ikra Tamanna',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '23',
      occupation: 'Nurse',
      biodataType: 'female',
      permanentDivision: 'Sylhet',
    },
    {
      _id: '102',
      name: 'Raihan Ahmed',
      profileImage: 'https://i.ibb.co/vCdbxQLG/image.png',
      age: '27',
      occupation: 'Software Engineer',
      biodataType: 'male',
      permanentDivision: 'Dhaka',
    },
    {
      _id: '103',
      name: 'Humayra Tasnim',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '24',
      occupation: 'Teacher',
      biodataType: 'female',
      permanentDivision: 'Khulna',
    },
    {
      _id: '104',
      name: 'Asif Hossain',
      profileImage: 'https://i.ibb.co/vCdbxQLG/image.png',
      age: '28',
      occupation: 'Doctor',
      biodataType: 'male',
      permanentDivision: 'Sylhet',
    },
    {
      _id: '105',
      name: 'Sumaiya Rahman',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '23',
      occupation: 'Student',
      biodataType: 'female',
      permanentDivision: 'Rajshahi',
    },
    {
      _id: '106',
      name: 'Tahmid Islam',
      profileImage: 'https://i.ibb.co/vCdbxQLG/image.png',
      age: '29',
      occupation: 'Architect',
      biodataType: 'male',
      permanentDivision: 'Chittagong',
    },
  ];

  const sortedMembers = [...members].sort((a, b) => {
    const ageA = parseInt(a.age);
    const ageB = parseInt(b.age);
    return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
  });

  return (
    <section className="py-24 px-6 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <div className="h-[1px] w-10 bg-rose-300" />
              <span className="text-rose-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                Exclusive Circle
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 leading-tight">
              Premium <span className="italic text-rose-600">Curations</span>
            </h2>
            <p className="mt-4 text-slate-500 font-light text-lg">
              Every profile is verified for authenticity, ensuring your journey
              toward a meaningful connection is secure and elegant.
            </p>
          </div>

          {/* Custom Styled Sort Filter */}
          <div className="flex items-center gap-3 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm">
            <div className="pl-4 text-slate-400">
              <ArrowUpDown size={18} />
            </div>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="bg-transparent pr-8 py-2 text-slate-700 font-semibold focus:outline-none cursor-pointer appearance-none"
            >
              <option value="asc">Age: Youngest First</option>
              <option value="desc">Age: Oldest First</option>
            </select>
          </div>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {sortedMembers.map((member, index) => (
              <motion.div
                key={member._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-500"
              >
                {/* Image Section with Overlay */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.profileImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />

                  {/* Premium Badge */}
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <Crown size={14} className="text-amber-500" />
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                      Premium
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-8">
                    <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-rose-200 text-xs font-medium uppercase tracking-widest mt-1">
                      Member ID: {member._id}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-6">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-rose-50 transition-colors">
                        <Briefcase
                          size={16}
                          className="text-slate-400 group-hover:text-rose-500"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Occupation
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {member.occupation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-rose-50 transition-colors">
                        <MapPin
                          size={16}
                          className="text-slate-400 group-hover:text-rose-500"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {member.permanentDivision}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-rose-400" />
                      <span className="text-sm font-bold text-slate-800">
                        {member.age} Years
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/biodata/${member._id}`)}
                      className="flex items-center gap-1 text-rose-600 font-bold text-sm hover:gap-2 transition-all group/link"
                    >
                      View Profile
                      <ChevronRight
                        size={18}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
