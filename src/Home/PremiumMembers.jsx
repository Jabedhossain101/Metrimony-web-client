import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

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
    <section className="py-28 px-6 bg-[#fdfaf9] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
          <div className="text-center md:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-[0.4em] text-pink-500 uppercase bg-pink-50 rounded-full"
            >
              Exquisite Selection
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
              Premium <span className="text-pink-600 italic">Profiles</span>
            </h2>
            <p className="mt-4 text-gray-500 font-light max-w-md">
              Discover verified members handpicked for meaningful lifelong
              connections.
            </p>
          </div>

          {/* Styled Sort */}
          <div className="relative group">
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="appearance-none bg-white border border-gray-100 px-8 py-5 pr-16 rounded-[2rem] text-gray-700 font-bold shadow-sm focus:ring-4 focus:ring-pink-100 outline-none cursor-pointer transition-all"
            >
              <option value="asc">Filter: Youngest</option>
              <option value="desc">Filter: Oldest</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-pink-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* --- 6 Card Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white/70 backdrop-blur-sm border border-white rounded-[3.5rem] p-10 hover:shadow-[0_40px_80px_-20px_rgba(236,72,153,0.18)] transition-all duration-500 relative"
            >
              {/* Premium Floating Badge */}
              <div className="absolute -top-4 right-10 bg-gradient-to-r from-pink-600 to-rose-400 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg">
                Member
              </div>

              {/* Profile Image with Modern Frame */}
              <div className="relative w-44 h-44 mx-auto mb-10">
                <div className="absolute inset-0 bg-pink-50 rounded-[3rem] -rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
                <img
                  src={member.profileImage}
                  alt={member.name}
                  className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl border-[6px] border-white group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Name & Title */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-serif font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {member.name}
                </h3>
                <span className="inline-block mt-2 px-3 py-1 bg-pink-50 text-pink-500 text-[10px] font-bold rounded-lg uppercase">
                  ID: #{member._id}
                </span>
              </div>

              {/* Minimalist Info Table */}
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                    Profession
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {member.occupation}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                    Located
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {member.permanentDivision}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                    Age
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {member.age} Years
                  </span>
                </div>
              </div>

              {/* --- Animated Action Button --- */}
              <button
                onClick={() => navigate(`/biodata/${member._id}`)}
                className="relative w-full overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-pink-600 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 rounded-2xl"></div>
                <div className="relative py-4 px-6 bg-gray-900 group-hover/btn:bg-transparent text-white rounded-2xl font-bold text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover/btn:shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
                  VIEW FULL PROFILE
                  <svg
                    className="w-4 h-4 animate-bounce-x"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
