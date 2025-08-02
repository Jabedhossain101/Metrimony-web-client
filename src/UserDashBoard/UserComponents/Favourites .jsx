// Favourites.jsx (Shows user’s favourited biodatas)

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const Favourites = () => {
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://metrimony-server-ten.vercel.app/favourites/me?email=${user.email}`
      )
        .then(res => res.json())
        .then(data => setFavs(data));
    }
  }, [user]);

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this favourite?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://metrimony-server-ten.vercel.app/favourites/${id}`,
        {
          method: 'DELETE',
        }
      );

      const result = await res.json();

      if (result.deletedCount > 0) {
        Swal.fire('Deleted!', 'Favourite removed.', 'success');
        setFavs(favs.filter(fav => fav._id !== id));
      } else {
        Swal.fire('Failed', 'Could not delete the favourite', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="h-10"></div>
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
        My Favourite Biodatas
      </h2>
      {favs.length === 0 ? (
        <p className="text-center text-gray-500">No favourites added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-pink-100 text-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Biodata ID</th>
                <th className="p-2">Division</th>
                <th className="p-2">Occupation</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favs.map(fav => (
                <tr key={fav._id} className="border-t text-center">
                  <td className="p-2">{fav.name}</td>
                  <td className="p-2">{fav.biodataId}</td>
                  <td className="p-2">{fav.permanentDivision}</td>
                  <td className="p-2">{fav.occupation}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <Link
                      to={`/biodata/${fav.biodataId}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(fav._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Favourites;
