import React from 'react';
import { GiSelfLove } from 'react-icons/gi';

const About = () => {
  return (
    <div>
      <div className="h-12"></div>
      <section className="min-h-screen flex items-center justify-center  transition">
        <div className="bg-white mt-6 rounded-2xl shadow-2xl p-8 max-w-7xl w-full mx-4 mb-2">
          <div className="flex flex-col items-center mb-6">
            <GiSelfLove className="text-5xl text-pink-500 mb-2" />
            <h1 className="text-4xl font-bold text-pink-700 mb-2">
              About Soul
              <span className="text-blue-500">mate</span>
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-xl">
              Your trusted platform for finding the perfect life partner. We
              believe in meaningful connections, transparency, and a safe
              environment for everyone seeking their soulmate.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="bg-pink-50 rounded-xl p-5 shadow">
              <h2 className="text-2xl font-semibold text-pink-600 mb-2">
                Our Mission
              </h2>
              <p className="text-gray-700">
                To empower individuals and families to find genuine, compatible
                matches through advanced technology, personalized
                recommendations, and a caring support team.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 shadow">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                Why Choose Us?
              </h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Verified and secure profiles</li>
                <li>Advanced search and matching algorithms</li>
                <li>Dedicated customer support</li>
                <li>Thousands of successful marriages</li>
                <li>Privacy and safety as our top priorities</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-5 shadow">
              <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                Join Our Community
              </h2>
              <p className="text-gray-700">
                Whether you are searching for your soulmate or helping a loved
                one, Soulmate is here to make your journey joyful and
                successful. Start your story with us today!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
