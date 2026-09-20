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
  FaEnvelope,
} from 'react-icons/fa';
import { FaBell } from 'react-icons/fa6';
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
    { name: 'Connections', path: 'connections', icon: <FaUsers /> },
    { name: 'Messages', path: 'messages', icon: <FaEnvelope /> },
    { name: 'Favourites Biodata', path: 'favourites', icon: <FaHeart /> },
    { name: 'Add Got Married', path: 'got-married', icon: <FaRing /> },
  ];

  const isActive = path => location.pathname.includes(path);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notifications
  const notifications = [
    { id: 1, text: "Aisha requested your contact info", time: "2m ago", unread: true },
    { id: 2, text: "Omar accepted your connection request", time: "1h ago", unread: true },
    { id: 3, text: "Your profile reached 100 views!", time: "2d ago", unread: false },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-card text-foreground border-b border-border flex justify-between items-center p-4 shadow-sm sticky top-0 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <IoHome className="text-primary text-2xl" />
          <span>Dashboard</span>
        </Link>
        <button onClick={toggleSidebar} className="p-2 bg-secondary rounded-lg">
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen w-72 bg-card text-foreground p-0 z-50 
          transform transition-all duration-300 ease-in-out border-r border-border
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8 pb-4">
            <Link
               to="/"
               className="flex items-center gap-2 text-2xl font-serif font-bold text-foreground mb-2 group"
             >
               <div className="bg-primary p-2.5 rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
                 <FaHeart className="text-primary-foreground w-4 h-4" />
               </div>
               <span className="tracking-tight">Soul<span className="text-primary italic">mate</span></span>
            </Link>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold ml-1">
              User Portal
            </p>
          </div>

          <div className="px-6 mb-6">
            <div className="bg-secondary/50 rounded-2xl p-5 text-center mb-6 border border-border shadow-sm">
              <img
                src={user?.userData?.photoURL || 'https://ui-avatars.com/api/?name=User'}
                alt="Profile"
                className="w-16 h-16 mx-auto rounded-full border-2 border-primary object-cover"
              />
              <h3 className="mt-3 text-lg font-bold text-foreground truncate">
                {user?.userData?.displayName || 'Welcome'}
              </h3>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              <span className="inline-block mt-3 px-3 py-1 text-[10px] uppercase tracking-widest rounded-full bg-accent/20 text-accent font-bold">
                Premium
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 font-bold'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground font-medium'
                }`}
              >
                <span
                  className={`${isActive(link.path) ? 'text-primary-foreground' : 'text-primary group-hover:scale-110 transition-transform'}`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer / Logout */}
          <div className="p-6 border-t border-border bg-card">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-secondary text-destructive border border-transparent rounded-2xl hover:bg-destructive/10 hover:border-destructive/20 transition-all duration-300 font-bold"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-2xl border border-border hover:bg-secondary transition-colors font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg font-bold"
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
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col bg-background relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <header className="hidden md:flex items-center justify-between px-10 py-6 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-30">
          <h2 className="text-2xl font-serif font-bold text-foreground">
            Welcome back,{' '}
            <span className="text-primary italic">{user?.displayName || 'User'}</span>
          </h2>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 bg-secondary text-foreground hover:bg-primary/10 hover:text-primary rounded-full relative transition-colors"
              >
                <FaBell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card"></span>
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden z-50">
                  <div className="p-5 border-b border-border flex justify-between items-center bg-secondary/30">
                    <h3 className="font-bold text-foreground">Notifications</h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary cursor-pointer hover:text-primary/80 transition-colors">Mark all as read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-5 border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors ${n.unread ? 'bg-primary/5' : ''}`}>
                        <p className={`text-sm ${n.unread ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>{n.text}</p>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mt-2">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
