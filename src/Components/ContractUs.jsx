import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">
              Touch
            </span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Amader team apnar jekono proshner uttor dite prostut. Jekono
            proyojone amader sathe jogajog korun.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Contact Info Cards */}
          <div className="space-y-6">
            <ContactInfoCard
              icon={<FaPhoneAlt className="text-pink-500" />}
              title="Phone"
              detail="+880 1234 567 890"
              subDetail="Mon-Fri from 9am to 6pm"
            />
            <ContactInfoCard
              icon={<FaEnvelope className="text-blue-500" />}
              title="Email"
              detail="support@soulmate.com"
              subDetail="Online support 24/7"
            />
            <ContactInfoCard
              icon={<FaMapMarkerAlt className="text-yellow-500" />}
              title="Office"
              detail="123 Matrimony Ave, Dhaka"
              subDetail="Bangladesh"
            />
          </div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Message
                </label>
                <textarea
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white transition-all resize-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-200 flex items-center justify-center gap-2 hover:shadow-pink-300 transition-all"
              >
                <FaPaperPlane className="text-sm" /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* Helper Component for Info Cards */
const ContactInfoCard = ({ icon, title, detail, subDetail }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
  >
    <div className="p-4 bg-gray-50 rounded-xl text-xl">{icon}</div>
    <div>
      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="text-gray-700 font-medium">{detail}</p>
      <p className="text-sm text-gray-400">{subDetail}</p>
    </div>
  </motion.div>
);

export default ContactUs;
