import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const PremiumMembers = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');

  // Tomar dewa full 6 jon member-er data
  const members = [
    {
      _id: '6879027237d85fc6e246cd05',
      name: 'Ikra Tamanna',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '23',
      occupation: 'Nurse',
      biodataType: 'female',
      permanentDivision: 'Sylhet',
    },
    {
      _id: '6879063537d85fc6e246cd14',
      name: 'Ikra Tamanna',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '23',
      occupation: 'Nurse',
      biodataType: 'female',
      permanentDivision: 'Sylhet',
    },
    {
      _id: '6879063537d85fc6e246cd15',
      name: 'Raihan Ahmed',
      profileImage: 'https://i.ibb.co/vCdbxQLG/image.png',
      age: '27',
      occupation: 'Software Engineer',
      biodataType: 'male',
      permanentDivision: 'Dhaka',
    },
    {
      _id: '6879063537d85fc6e246cd16',
      name: 'Humayra Tasnim',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '24',
      occupation: 'Teacher',
      biodataType: 'female',
      permanentDivision: 'Khulna',
    },
    {
      _id: '6879063537d85fc6e246cd17',
      name: 'Asif Hossain',
      profileImage: 'https://i.ibb.co/vCdbxQLG/image.png',
      age: '28',
      occupation: 'Doctor',
      biodataType: 'male',
      permanentDivision: 'Sylhet',
    },
    {
      _id: '6879063537d85fc6e246cd18',
      name: 'Sumaiya Rahman',
      profileImage: 'https://i.ibb.co/d483rxhx/image.png',
      age: '23',
      occupation: 'Student',
      biodataType: 'female',
      permanentDivision: 'Rajshahi',
    },
  ];

  const sortedMembers = [...members].sort((a, b) => {
    const ageA = parseInt(a.age);
    const ageB = parseInt(b.age);
    return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
  });

  return (
    <section className="py-24 px-6 bg-white max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-pink-600 font-bold tracking-[0.3em] uppercase text-xs"
          >
            Exclusive Profiles
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900"
          >
            Premium <span className="text-pink-600 italic">Members</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pink-600 to-transparent rounded-full"></div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative group min-w-[220px]">
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="w-full appearance-none bg-[#fdf8f7] border border-pink-50 px-6 py-4 rounded-2xl text-gray-700 font-semibold focus:ring-2 focus:ring-pink-500 outline-none cursor-pointer shadow-sm transition-all"
          >
            <option value="asc">Age: Youngest First</option>
            <option value="desc">Age: Oldest First</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-pink-600">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid displaying all 6 members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        {sortedMembers.map((member, index) => (
          <motion.div
            key={member._id + index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-[#fdf8f7]/40 rounded-[3rem] p-8 border border-transparent hover:border-pink-100 hover:bg-white transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(236,72,153,0.15)]"
          >
            {/* Premium Badge */}
            <div className="absolute top-8 right-8 z-10">
              <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-pink-50 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">
                  Premium
                </span>
              </div>
            </div>

            {/* Profile Image with Dynamic Frame */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-pink-100 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <img
                src={member.profileImage}
                alt={member.name}
                className="relative w-full h-full object-cover rounded-[2.5rem] border-4 border-white shadow-xl"
              />
            </div>

            {/* Name & ID */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">
                Biodata ID: {member._id.slice(-6)}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 py-6 border-t border-pink-100/50">
              <div>
                <p className="text-[9px] text-pink-400 font-black uppercase tracking-tighter">
                  Occupation
                </p>
                <p className="text-sm font-bold text-gray-700 truncate">
                  {member.occupation}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-pink-400 font-black uppercase tracking-tighter">
                  Division
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {member.permanentDivision}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-pink-400 font-black uppercase tracking-tighter">
                  Age
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {member.age} Yrs
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-pink-400 font-black uppercase tracking-tighter">
                  Gender
                </p>
                <p className="text-sm font-bold text-gray-700 capitalize">
                  {member.biodataType}
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/biodata/${member._id}`)}
              className="mt-4 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-100 active:scale-95"
            >
              View Full Profile
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PremiumMembers;
