import React from 'react';
import { FaFemale, FaMale, FaRing } from 'react-icons/fa';
import CountUp from 'react-countup';

const SuccessCounter = () => (
  <section className="max-w-4xl mx-auto mt-16 px-4 py-12">
    <h2 className="text-3xl font-bold text-center mb-10 text-pink-700">
      Our Success in Numbers
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {/* Girls Biodata */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform duration-300">
        <FaFemale className="text-pink-500 text-5xl mb-2" />
        <span className="text-4xl font-bold text-pink-700">
          <CountUp end={2500} duration={2} separator="," />+
        </span>
        <p className="text-gray-600 mt-2">Girls Biodata</p>
      </div>

      {/* Boys Biodata */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform duration-300">
        <FaMale className="text-blue-500 text-5xl mb-2" />
        <span className="text-4xl font-bold text-blue-700">
          <CountUp end={3000} duration={2} separator="," />+
        </span>
        <p className="text-gray-600 mt-2">Boys Biodata</p>
      </div>

      {/* Marriages Completed */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform duration-300">
        <FaRing className="text-yellow-500 text-5xl mb-2" />
        <span className="text-4xl font-bold text-yellow-600">
          <CountUp end={1200} duration={2} separator="," />+
        </span>
        <p className="text-gray-600 mt-2">Marriages Completed</p>
      </div>
    </div>
  </section>
);

export default SuccessCounter;
