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
  Bell,
  Users
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef();
  const notificationRef = useRef();
  const location = useLocation();

  // Auto-close menus on navigation
  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
    setShowNotifications(false);
  }, [location]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
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
    <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* --- BRAND LOGO --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2.5 rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
              <Heart className="text-primary-foreground w-5 h-5" fill="currentColor" />
            </div>
            <span className="text-2xl font-serif font-bold text-foreground tracking-tight">
              Soul<span className="text-primary italic">mate</span>
            </span>
          </Link>

          {/* --- DESKTOP NAV --- */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map(link => (
                <li key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="h-6 w-[1px] bg-border" />

            {/* --- RIGHT ACTIONS --- */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {/* Quick Matches Button */}
                  <Link
                    to="/biodata"
                    className="hidden xl:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Users size={16} /> Matches
                  </Link>

                  {/* Notification Bell */}
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors relative"
                    >
                      <Bell size={20} />
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background"></span>
                    </button>
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-72 bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
                        >
                          <div className="p-4 border-b border-border">
                            <h3 className="font-semibold text-foreground">Notifications</h3>
                          </div>
                          <div className="p-4 text-sm text-muted-foreground text-center">
                            You have no new notifications.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-2 p-1 pr-3 rounded-full bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <img
                        src={
                          user?.userData?.photoURL ||
                          `https://ui-avatars.com/api/?name=${user?.name}`
                        }
                        className="w-9 h-9 rounded-full object-cover"
                        alt="User"
                      />
                      <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                        {user?.name?.split(' ')[0]}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-64 bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
                        >
                          <div className="p-5 bg-secondary/50 border-b border-border flex flex-col items-center">
                            <img
                              src={
                                user?.userData?.photoURL ||
                                `https://ui-avatars.com/api/?name=${user?.name}`
                              }
                              className="w-16 h-16 rounded-full border-2 border-background shadow-sm mb-3"
                              alt="Avatar"
                            />
                            <p className="font-semibold text-foreground">
                              {user?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
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
                            <div className="my-1 border-t border-border" />
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                            >
                              <LogOut size={16} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
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
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-xl transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`p-3 rounded-xl font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.userData?.photoURL || `https://ui-avatars.com/api/?name=${user?.name}`}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            Role: {user.role || 'User'}
                          </p>
                        </div>
                      </div>
                      <Link to="/notifications" className="p-2 bg-background rounded-full text-foreground relative shadow-sm">
                         <Bell size={18} />
                         <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                       <Link
                        to="/profile"
                        className="p-3 text-center text-sm font-medium text-foreground bg-secondary rounded-xl hover:bg-secondary/80"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="p-3 text-center text-sm font-medium text-foreground bg-secondary rounded-xl hover:bg-secondary/80"
                      >
                        Dashboard
                      </Link>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full p-3 text-center font-medium text-destructive bg-destructive/10 rounded-xl hover:bg-destructive/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="w-full p-3 text-center font-medium text-foreground border border-border rounded-xl hover:bg-secondary transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full p-3 text-center font-medium text-primary-foreground bg-primary rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
                    >
                      Register Now
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
    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl transition-all"
  >
    <span className="text-muted-foreground">{icon}</span>
    {label}
  </Link>
);

export default Navbar;
