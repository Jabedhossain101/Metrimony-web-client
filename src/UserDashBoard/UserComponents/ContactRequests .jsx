import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

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

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this contact request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/contact-request/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (result.deletedCount > 0) {
        Swal.fire('Deleted!', 'Contact request has been deleted.', 'success');
        setRequests(requests.filter(req => req._id !== id));
      } else {
        Swal.fire('Error', 'Failed to delete the contact request.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

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
              <td className="flex gap-2">
                <Link
                  to={`/biodata/${req.biodataId}`}
                  className="bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-700"
                >
                  View
                </Link>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(req._id)}
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
