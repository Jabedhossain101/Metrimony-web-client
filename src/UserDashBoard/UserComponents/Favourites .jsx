import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const Favourites = () => {
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/favourites/me?email=${user.email}`)
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
      const res = await fetch(`http://localhost:3000/favourites/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (result.deletedCount > 0) {
        Swal.fire('Deleted!', 'Favourite removed.', 'success');
        setFavs(favs.filter(fav => fav._id !== id)); // update UI
      } else {
        Swal.fire('Failed', 'Could not delete the favourite', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favourite Biodatas</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Biodata ID</th>
            <th>Address</th>
            <th>Occupation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {favs.map(fav => (
            <tr key={fav._id} className="border-t">
              <td>{fav.name}</td>
              <td>{fav.biodataId}</td>
              <td>{fav.permanentDivision}</td>
              <td>{fav.occupation}</td>
              <td className="flex gap-2">
                <Link
                  to={`/biodata/${fav.biodataId}`}
                  className=" bg-pink-400 m-1 rounded-sm "
                >
                  <button className="p-1">View</button>
                </Link>
                <button
                  className="text-red-500 hover:underline"
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
  );
};

export default Favourites;
