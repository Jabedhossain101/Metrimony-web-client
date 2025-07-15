import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const ContactRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/contact-request/me?email=${user.email}`)
        .then(res => res.json())
        .then(data => setRequests(data));
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Contact Requests</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Biodata ID</th>
            <th>Status</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id} className="border-t">
              <td>{req.name}</td>
              <td>{req.biodataId}</td>
              <td>{req.status}</td>
              <td>{req.status === 'approved' ? req.mobile : 'N/A'}</td>
              <td>{req.status === 'approved' ? req.email : 'N/A'}</td>
              <td>
                <button
                  className="text-red-500"
                  onClick={() => alert('Delete Request')}
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

export default ContactRequests;
