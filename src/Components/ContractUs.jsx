import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContractUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 transition">
      <div className="bg-white/90 dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4">
        <h1 className="text-4xl font-bold text-center text-pink-700 dark:text-pink-400 mb-6">
          Contact <span className="text-blue-500 dark:text-blue-300">Us</span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Have questions or need help? Reach out to our team and we’ll get back
          to you as soon as possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-2xl text-pink-500 mb-2" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Phone
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              +1 234 567 890
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-2xl text-blue-500 mb-2" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Email
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              support@soulmate.com
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-2xl text-yellow-500 mb-2" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Address
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-center">
              123 Matrimony Ave,
              <br />
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
        <form className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md px-4 py-2 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContractUs;
