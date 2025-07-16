import React from 'react';
import { Outlet, NavLink } from 'react-router';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <nav className="space-y-2">
          <NavLink to="/admin-dashboard" className="block hover:text-pink-600">
            Admin Dashboard
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage"
            className="block hover:text-pink-600"
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin-dashboard/approvedPremium"
            className="block hover:text-pink-600"
          >
            Approved Premium
          </NavLink>
          <NavLink
            to="/admin-dashboard/approvedContactRequest"
            className="block hover:text-pink-600"
          >
            Approved Contact Request
          </NavLink>
          <button className="text-red-600 mt-4">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
