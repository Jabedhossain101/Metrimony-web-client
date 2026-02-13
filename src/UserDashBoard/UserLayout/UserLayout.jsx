import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router';
import {
  FaBars,
  FaTimes,
  FaEdit,
  FaEye,
  FaUsers,
  FaHeart,
  FaRing,
  FaSignOutAlt,
} from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { IoHome } from 'react-icons/io5';
import Profile from '../../Components/Profile';

const UserLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your premium session!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899', // Pink-500
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, logout!',
    }).then(result => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged out!',
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/');
          })
          .catch(error => {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
          });
      }
    });
  };

  const navLinks = [
    { name: 'Edit Biodata', path: 'edit-biodata', icon: <FaEdit /> },
    { name: 'View Biodata', path: 'view-biodata', icon: <FaEye /> },
    { name: 'My Contact Request', path: 'contact-requests', icon: <FaUsers /> },
    { name: 'Favourites Biodata', path: 'favourites', icon: <FaHeart /> },
    { name: 'Add Got Married', path: 'got-married', icon: <FaRing /> },
  ];

  const isActive = path => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-slate-900 text-white flex justify-between items-center p-4 shadow-lg sticky top-0 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <IoHome className="text-pink-500 text-2xl" />
          <span>Dashboard</span>
        </Link>
        <button onClick={toggleSidebar} className="p-2 bg-slate-800 rounded-lg">
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 text-slate-300 p-0 z-50 
          transform transition-all duration-300 ease-in-out border-r border-slate-800
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8 pb-4">
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-bold text-white mb-2"
            >
              <div className="bg-pink-500 p-2 rounded-xl shadow-lg shadow-pink-500/20">
                <IoHome className="text-white" />
              </div>
              <span>Platform</span>
            </Link>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold ml-1">
              User Management
            </p>
          </div>

          <div className="px-6 mb-6">
            <Profile />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive(link.path)
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 font-medium'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span
                  className={`${isActive(link.path) ? 'text-white' : 'text-slate-500 group-hover:text-pink-400'}`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer / Logout */}
          <div className="p-6 border-t border-slate-800">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800 text-red-400 border border-slate-700 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-medium"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition shadow-lg shadow-pink-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="hidden md:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200 sticky top-0 z-30">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome back,{' '}
            <span className="text-pink-600">{user?.displayName || 'User'}</span>
          </h2>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{new Date().toLocaleDateString('en-GB')}</span>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[80vh] p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
