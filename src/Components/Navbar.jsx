import React, { use, useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  LogOut,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();

  // Smart background transition on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close menus on navigation
  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  // Outside click handler for dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Salam! Signed out successfully.');
    } catch (error) {
      toast.error('Failed to sign out!');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Biodatas', path: '/biodata' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* --- BRAND LOGO --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-rose-500 p-2 rounded-2xl shadow-lg shadow-rose-200 group-hover:rotate-12 transition-transform duration-300">
              <Heart className="text-white w-5 h-5" fill="currentColor" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Soul<span className="text-rose-500 italic">mate</span>
            </span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map(link => (
                <li key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm font-bold transition-colors ${
                      location.pathname === link.path
                        ? 'text-rose-500'
                        : 'text-slate-600 hover:text-rose-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-rose-500 rounded-full"
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="h-6 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-white border border-slate-100 shadow-sm hover:border-rose-200 transition-all"
                  >
                    <img
                      src={
                        user?.userData?.photoURL ||
                        `https://ui-avatars.com/api/?name=${user?.name}`
                      }
                      className="w-8 h-8 rounded-full object-cover"
                      alt="User"
                    />
                    <span className="text-sm font-bold text-slate-700 max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
                      >
                        <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col items-center">
                          <img
                            src={user?.userData?.photoURL}
                            className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                            alt="Avatar"
                          />
                          <p className="font-bold text-slate-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user?.email}
                          </p>
                        </div>
                        <div className="p-2">
                          <DropdownItem
                            to="/profile"
                            icon={<User size={16} />}
                            label="My Profile"
                          />
                          <DropdownItem
                            to={
                              user.role === 'admin'
                                ? '/admin-dashboard'
                                : '/dashboard'
                            }
                            icon={<LayoutDashboard size={16} />}
                            label="Dashboard"
                          />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-sm font-bold text-slate-700 hover:text-rose-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-sm font-bold hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-200 transition-all duration-300 flex items-center gap-2"
                  >
                    Join Free <Sparkles size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-900"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-50"
          >
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`p-4 rounded-2xl font-bold transition-all ${
                      location.pathname === link.path
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                      <img
                        src={user?.userData?.photoURL}
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">
                          Member ID: {user.role}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block p-4 text-center font-bold text-slate-700 bg-white border border-slate-100 rounded-2xl"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full p-4 text-center font-bold text-rose-600 bg-rose-50 rounded-2xl"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="w-full p-4 text-center font-bold text-slate-700 border border-slate-200 rounded-2xl"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full p-4 text-center font-bold text-white bg-rose-600 rounded-2xl shadow-lg shadow-rose-100"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Helper Dropdown Component
const DropdownItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-rose-600 rounded-2xl transition-all"
  >
    <span className="text-slate-400 group-hover:text-rose-500">{icon}</span>
    {label}
  </Link>
);

export default Navbar;
