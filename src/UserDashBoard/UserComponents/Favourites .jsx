import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

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
              <td>
                <button
                  className="text-red-500"
                  onClick={() => alert('Delete Favourite')}
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
