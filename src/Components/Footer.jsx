import React from 'react';
import { GiSelfLove } from 'react-icons/gi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0c] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* --- Brand & Newsletter (6 Columns) --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-600 rounded-2xl shadow-lg shadow-pink-500/20">
                <GiSelfLove className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Soul<span className="text-pink-500 italic">mate</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
              Your trusted destination to find your soulmate. Connecting hearts
              with trust, transparency, and tradition.
            </p>

            {/* Newsletter Input */}
            <div className="relative max-w-sm group">
              <input
                type="email"
                placeholder="Join our newsletter"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-pink-500 transition-all text-sm placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 bottom-2 px-5 bg-pink-600 rounded-xl text-white hover:bg-pink-700 transition-all flex items-center justify-center">
                <FaPaperPlane className="text-sm" />
              </button>
            </div>
          </div>

          {/* --- Quick Links (7 Columns) --- */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Company */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-pink-500 mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Privacy Policy', 'Terms'].map(
                  item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-pink-500 hover:translate-x-2 transition-all inline-block font-light"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-pink-500 mb-6">
                Services
              </h3>
              <ul className="space-y-4">
                {[
                  'Biodata Listings',
                  'Matchmaking',
                  'Premium Plans',
                  'Success Stories',
                ].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-pink-500 hover:translate-x-2 transition-all inline-block font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-pink-500 mb-6">
                Stay Connected
              </h3>
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebookF, color: 'hover:bg-[#1877F2]' },
                  { Icon: FaTwitter, color: 'hover:bg-[#1DA1F2]' },
                  {
                    Icon: FaInstagram,
                    color:
                      'hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
                  },
                  { Icon: FaLinkedinIn, color: 'hover:bg-[#0A66C2]' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ y: -5 }}
                    href="#"
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                  >
                    <social.Icon size={16} />
                  </motion.a>
                ))}
              </div>
              <div className="mt-8">
                <p className="text-xs text-gray-500 font-medium">
                  Support Email:
                </p>
                <p className="text-sm text-pink-500">hello@soulmate.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            © {currentYear} SOULMATE — CRAFTED WITH LOVE FOR MEANINGFUL
            CONNECTIONS.
          </p>
          <div className="flex gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-pink-500 transition-colors">
              Safety Tips
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
