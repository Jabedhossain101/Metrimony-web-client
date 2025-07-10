import React from 'react';
import { GiSelfLove } from 'react-icons/gi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GiSelfLove className="text-pink-400 text-3xl" />
            <h2 className="text-2xl font-bold">
              Soul<span className="text-pink-400">mate</span>
            </h2>
          </div>
          <p className="text-gray-400">
            Your trusted destination to find your life partner. We connect
            hearts.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition">
                Biodata Listings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Matchmaking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Premium Plans
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Success Stories
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t pt-6 border-gray-700">
        © {new Date().getFullYear()} Soulmate — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
