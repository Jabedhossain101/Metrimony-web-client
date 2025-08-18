import React, { use, useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Icons
import { GiSelfLove } from 'react-icons/gi';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

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

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const links = (
    <>
      <Link
        to="/"
        className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
      >
        Home
      </Link>
      <Link
        to="/biodata"
        className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
      >
        Biodatas
      </Link>
      {user && (
        <>
          {user.role === 'user' && (
            <Link
              to="/dashboard"
              className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
            >
              Dashboard
            </Link>
          )}
          {user.role === 'admin' && (
            <Link
              to="/admin-dashboard"
              className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
            >
              Admin Dashboard
            </Link>
          )}
        </>
      )}
      <Link
        to="/about"
        className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
      >
        About Us
      </Link>
      <Link
        to="/contact"
        className="p-2 hover:underline hover:text-blue-500 cursor-pointer"
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GiSelfLove className="text-3xl text-pink-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Soul<span className="text-pink-500">mate</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-4 text-gray-800">{links}</ul>

            {/* User / Auth buttons */}
            <div className="flex space-x-3 items-center">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <img
                    src={user?.userData?.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-60 border rounded-md shadow-lg z-50 bg-white">
                      <div className="p-4 border-b text-center">
                        <img
                          src={user?.userData?.photoURL}
                          className="w-14 h-14 rounded-full mx-auto mb-2"
                          alt="User Avatar"
                        />
                        <h3 className="font-semibold text-gray-900">
                          {user?.name}
                        </h3>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <ul className="text-sm">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Your profile
                          </Link>
                        </li>
                        <li>
                          {user?.role === 'admin' ? (
                            <Link
                              to="/admin-dashboard"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Admin Dashboard
                            </Link>
                          ) : (
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Dashboard
                            </Link>
                          )}
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Log out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
                    <Link to="/login"> Login</Link>
                  </button>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                    <Link to="/register"> Register</Link>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-3">
          <div className="flex space-x-3 items-center justify-center">
            {user ? (
              <div className="relative " ref={dropdownRef}>
                <img
                  src={user?.userData?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute -left-4 mt-2 w-60 bg-white border rounded-md shadow-lg z-50">
                    <div className="p-4 border-b text-center">
                      <img
                        src={user?.userData?.photoURL}
                        className="w-14 h-14 rounded-full mx-auto mb-2"
                        alt="User Avatar"
                      />

                      <h3 className="font-semibold text-gray-900">
                        {user?.name}
                      </h3>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <ul className="text-sm">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Your profile
                        </Link>
                      </li>
                      <li>
                        {user?.role === 'admin' ? (
                          <Link
                            to="/admin-dashboard"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Admin Dashboard
                          </Link>
                        ) : (
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
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
                  <Link to="/login"> Login</Link>
                </button>
                <button className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                  <Link to="/register"> Register</Link>
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
