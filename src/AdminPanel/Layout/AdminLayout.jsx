import React, { use, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router'; // ✅ Use react-router-dom
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const AdminLayout = () => {
  const { logOut } = use(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* ✅ Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center p-4 border-b shadow-sm bg-white ">
        <h1 className="text-xl font-bold text-pink-600">Admin Panel</h1>
        <button onClick={toggleSidebar}>
          <Menu size={28} />
        </button>
      </div>

      {/* ✅ Sidebar Menu - Overlay on Mobile */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-100 min-h-screen p-6 border-r z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* ✅ Close button for mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold text-pink-600">Menu</h2>
          <button onClick={closeSidebar}>
            <X size={26} />
          </button>
        </div>

        {/* ✅ Navigation Links */}
        <nav className="space-y-4">
          <NavLink
            to="/admin-dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block font-medium ${
                isActive ? 'text-pink-600' : 'text-gray-800'
              }`
            }
          >
            Admin Dashboard
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block font-medium ${
                isActive ? 'text-pink-600' : 'text-gray-800'
              }`
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin-dashboard/approvedPremium"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block font-medium ${
                isActive ? 'text-pink-600' : 'text-gray-800'
              }`
            }
          >
            Approved Premium
          </NavLink>
          <NavLink
            to="/admin-dashboard/approvedContactRequest"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block font-medium ${
                isActive ? 'text-pink-600' : 'text-gray-800'
              }`
            }
          >
            Approved Contact Request
          </NavLink>
          <NavLink
            to="/admin-dashboard/premiumRequests"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block font-medium ${
                isActive ? 'text-pink-600' : 'text-gray-800'
              }`
            }
          >
            Premium Requests
          </NavLink>

          <button
            onClick={handleLogout}
            className="black w-full mt-6  p-2 rounded-md bg-pink-500"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
