import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const PremiumMembers = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');

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
    <section className="my-10 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🌟 Premium Members</h2>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border px-2 py-2 rounded shadow-sm focus:outline-none"
        >
          <option value="asc">Sort by Age: Ascending</option>
          <option value="desc">Sort by Age: Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedMembers.map(member => (
          <div
            key={member._id}
            className="bg-white border rounded-2xl shadow-xl p-5 relative transition-transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Premium badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              Premium
            </div>

            {/* Image with gradient border */}
            <div className="mx-auto w-32 h-32 rounded-full p-1 bg-gradient-to-r from-pink-500 to-purple-500">
              <img
                src={member.profileImage}
                alt={member.name}
                className="w-full h-full object-cover rounded-full border-4 border-white"
              />
            </div>

            <h3 className="text-lg font-bold text-center mt-4 text-pink-700">
              {member.name}
            </h3>
            <p className="text-center text-sm text-gray-600 mt-1">
              Biodata ID: <span className="font-medium">{member._id}</span>
            </p>

            <div className="mt-4 text-sm text-gray-700 space-y-1 text-center">
              <p>
                <strong>Type:</strong> {member.biodataType}
              </p>
              <p>
                <strong>Division:</strong> {member.permanentDivision}
              </p>
              <p>
                <strong>Age:</strong> {member.age}
              </p>
              <p>
                <strong>Occupation:</strong> {member.occupation}
              </p>
            </div>

            <button
              onClick={() => navigate(`/biodata/${member._id}`)}
              className="mt-5 w-full px-4 py-2 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-700 transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumMembers;
