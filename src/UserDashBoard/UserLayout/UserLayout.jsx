import { useState } from 'react';
import { Link, Outlet } from 'react-router'; // use react-router-dom instead of 'react-router'
import { FaBars, FaTimes } from 'react-icons/fa';

const UserLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
        {/* Only visible in mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <FaTimes size={20} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
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
          <button
            className="text-left"
            onClick={() => {
              setIsOpen(false);
              alert('Logout triggered');
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
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
