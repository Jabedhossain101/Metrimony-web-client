import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { IoHome } from 'react-icons/io5';

const UserLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
            Swal.fire({
              icon: 'error',
              title: 'Logout Failed!',
              text: error.message,
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-blue-800 text-white flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          min-h-screen fixed md:static top-0 left-0 h-full w-64 bg-blue-800 text-white p-6 z-50 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:block
        `}
      >
        {/* Mobile only close button */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <Link to={'/'} className="text-3xl flex">
            <IoHome />
          </Link>
          <h2 className="text-xl font-bold -ml-10">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <FaTimes size={20} />
          </button>
        </div>

        <Link
          to={'/'}
          className="text-2xl font-bold mb-6 hidden md:block"
        >
          Dashboard
        </Link>

        <nav className="flex flex-col space-y-4">
          <Link to="edit-biodata" onClick={() => setIsOpen(false)}>
            Edit Biodata
          </Link>
          <Link to="view-biodata" onClick={() => setIsOpen(false)}>
            View Biodata
          </Link>
          <Link to="contact-requests" onClick={() => setIsOpen(false)}>
            My Contact Request
          </Link>
          <Link to="favourites" onClick={() => setIsOpen(false)}>
            Favourites Biodata
          </Link>
          <Link to="got-married" onClick={() => setIsOpen(false)}>
            Add Got Married
          </Link>

          {/* Auth Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 mt-4 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
