import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ApprovedPremium = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:3000/premium-requests');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching premium requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleMakePremium = async id => {
    const confirm = await Swal.fire({
      title: 'Make this user Premium?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, make premium',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/users/make-premium/${id}`,
        {
          method: 'PATCH',
        }
      );
      const result = await res.json();

      if (result.modifiedCount > 0) {
        Swal.fire('Success!', 'User is now premium.', 'success');
        fetchRequests();
      } else {
        Swal.fire('Failed', 'Could not update user premium status.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Approved Premium Requests</h2>
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Biodata ID</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No premium requests found.
              </td>
            </tr>
          )}

          {requests.map(req => (
            <tr key={req._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{req.name}</td>
              <td className="border border-gray-300 px-4 py-2">{req.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {req.biodataId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleMakePremium(req.userId)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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

export default ApprovedPremium;
