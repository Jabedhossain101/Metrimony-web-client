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
      <h2 className="text-2xl font-bold mb-4 text-center">
        My Contact Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Biodata ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Mobile
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map(req => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                  {req.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                  {req.biodataId}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm capitalize text-gray-800">
                  {req.status}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                  {req.status === 'approved' ? req.mobile : 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                  {req.status === 'approved' ? req.email : 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm flex gap-2">
                  <Link
                    to={`/biodata/${req.biodataId}`}
                    className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
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

export default ContactRequests;
