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

  const handleMakeAdmin = async id => {
    try {
      const res = await fetch(`http://localhost:3000/users/make-admin/${id}`, {
        method: 'PATCH',
      });
      const result = await res.json();
      if (result.modifiedCount > 0) {
        Swal.fire('Success', 'User is now an admin!', 'success');
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMakePremium = async id => {
    try {
      const res = await fetch(
        `http://localhost:3000/users/make-premium/${id}`,
        {
          method: 'PATCH',
        }
      );
      const result = await res.json();
      if (result.modifiedCount > 0) {
        Swal.fire('Success', 'User is now premium!', 'success');
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
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name"
          className="border px-4 py-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t text-center">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleMakeAdmin(user._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => handleMakePremium(user._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Make Premium
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
