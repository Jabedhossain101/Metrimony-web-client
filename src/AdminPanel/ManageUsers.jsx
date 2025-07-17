import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async (query = '') => {
    try {
      const res = await fetch(
        `http://localhost:3000/users${query ? `?search=${query}` : ''}`
      );
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async user => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';

    try {
      const res = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const result = await res.json();
      if (result.modifiedCount > 0) {
        Swal.fire(
          'Success',
          `User is now ${newRole === 'admin' ? 'an Admin' : 'a regular User'}!`,
          'success'
        );
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePremium = async user => {
    const isPremium = user.isPremium;
    try {
      const res = await fetch(
        `http://localhost:3000/users/premium/${user._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isPremium: !isPremium }),
        }
      );
      const result = await res.json();
      if (result.modifiedCount > 0) {
        Swal.fire(
          'Success',
          `User is now ${!isPremium ? 'Premium' : 'Non-premium'}!`,
          'success'
        );
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    fetchUsers(search);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Manage Users
      </h2>

      <form
        onSubmit={handleSearch}
        className="mb-4 flex flex-col md:flex-row items-center justify-center gap-2"
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name"
          className="border px-4 py-2 rounded w-full md:w-1/3 text-sm md:text-base"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Role</th>
              <th className="px-2 py-2">Premium</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t text-center">
                <td className="px-2 py-2">{user.name}</td>
                <td className="px-2 py-2">{user.email}</td>
                <td className="px-2 py-2">{user.role}</td>
                <td className="px-2 py-2">{user.isPremium ? 'Yes' : 'No'}</td>
                <td className="px-2 py-2 space-x-1">
                  <button
                    onClick={() => toggleAdmin(user)}
                    className={`${
                      user.role === 'admin' ? 'bg-red-500' : 'bg-green-500'
                    } text-white px-2 py-1 rounded text-xs md:text-sm`}
                  >
                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => togglePremium(user)}
                    className={`${
                      user.isPremium ? 'bg-gray-500' : 'bg-yellow-500'
                    } text-white px-2 py-1 rounded text-xs md:text-sm`}
                  >
                    {user.isPremium ? 'Remove Premium' : 'Make Premium'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
