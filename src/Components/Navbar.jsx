import React, { use, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { GiSelfLove } from 'react-icons/gi';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('✅ Signed out successfully!');
      })
      .catch(error => {
        console.error('Error logging out:', error);
        toast.error('❌ Failed to sign out!');
      });
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = (
    <>
      <Link
        to={'/'}
        className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
      >
        Home
      </Link>
      <Link
        to={'/biodata'}
        className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
      >
        Biodatas
      </Link>
      {user && (
        <>
          <Link
            to={'/added-member'}
            className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
          >
            Added Members
          </Link>
          <Link
            to={'/dashboard'}
            className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
          >
            DashBoard
          </Link>
        </>
      )}
      <li className="p-2 hover:underline hover:text-blue-500 cursor-pointer">
        About Us
      </li>
      <li className="p-2 hover:underline hover:text-blue-500 cursor-pointer">
        Contact Us
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GiSelfLove className="text-3xl text-pink-500" />
            <h1 className="text-2xl font-bold">
              Soul<span className="text-pink-500">mate</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-4">{links}</ul>

            {/* Buttons */}
            <div className="flex space-x-3">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
                    <Link to={'/login'}> Login</Link>
                  </button>
                  <button className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                    <Link to={'/register'}> Register</Link>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-3">
          <ul className="flex flex-col items-center space-y-2">{links}</ul>

          <div className="flex flex-col items-center space-y-2 mt-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
              >
                Sign out
              </button>
            ) : (
              <>
                <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
                  <Link to={'/login'}> Login</Link>
                </button>
                <button className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                  <Link to={'/register'}> Register</Link>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
