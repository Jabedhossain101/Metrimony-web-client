import React from 'react';
import {
  FaUserPlus,
  FaSearch,
  FaHeart,
  FaComments,
  FaUserCheck,
  FaSmile,
} from 'react-icons/fa';

const HowItWorks = () => (
  <section data-aos="fade-up" className="max-w-6xl mx-auto mt-16 px-4 py-12">
    <h2 className="text-3xl font-bold text-center mb-10 text-pink-700">
      How It Works
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Step 1 */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <span className="text-pink-600 text-5xl mb-4">
          <FaUserPlus />
        </span>
        <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
        <p className="text-gray-600 text-center">
          Sign up and create your detailed profile to get started on your search
          for the perfect match.
        </p>
      </div>
      {/* Step 2 */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <span className="text-pink-600 text-5xl mb-4">
          <FaSearch />
        </span>
        <h3 className="text-xl font-semibold mb-2">Search Profiles</h3>
        <p className="text-gray-600 text-center">
          Browse and filter profiles based on your preferences and interests.
        </p>
      </div>
      {/* Step 3 */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <span className="text-pink-600 text-5xl mb-4">
          <FaUserCheck />
        </span>
        <h3 className="text-xl font-semibold mb-2">Express Interest</h3>
        <p className="text-gray-600 text-center">
          Show interest in profiles you like and let them know you want to
          connect.
        </p>
      </div>
      {/* Step 4 */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <span className="text-pink-600 text-5xl mb-4">
          <FaComments />
        </span>
        <h3 className="text-xl font-semibold mb-2">Start Conversation</h3>
        <p className="text-gray-600 text-center">
          Chat securely and get to know your matches better through our
          messaging system.
        </p>
      </div>
      {/* Step 5 */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <span className="text-pink-600 text-5xl mb-4">
          <FaHeart />
        </span>
        <h3 className="text-xl font-semibold mb-2">Build Connection</h3>
        <p className="text-gray-600 text-center">
          Deepen your connection and see if you are truly compatible for a
          lifelong relationship.
        </p>
      </div>
      {/* Step 6 */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <span className="text-pink-600 text-5xl mb-4">
          <FaSmile />
        </span>
        <h3 className="text-xl font-semibold mb-2">Find Happiness</h3>
        <p className="text-gray-600 text-center">
          Take the next step towards marriage and a happy future together!
        </p>
      </div>
    </div>
  </section>
);

export default HowItWorks;
