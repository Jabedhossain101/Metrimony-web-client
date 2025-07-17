import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ApprovedPremium = () => {
  const [requests, setRequests] = useState([]);

  const fetchApproved = async () => {
    const res = await fetch('http://localhost:3000/premium-requests');
    const data = await res.json();
    setRequests(data.filter(r => r.status === 'approved'));
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  const handleRemovePremium = async userId => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove premium status from the user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/users/remove-premium/${userId}`,
        {
          method: 'PATCH',
        }
      );

      const result = await res.json();

      if (res.ok && result.modifiedCount > 0) {
        Swal.fire('Removed!', 'Premium status removed.', 'success');
        setRequests(prev => prev.filter(req => req.userId !== userId));
      } else {
        Swal.fire(
          'Failed',
          result.message || 'Could not remove premium status.',
          'error'
        );
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Approved Premium Users
      </h2>

      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-center text-sm md:text-base">
              <th className="border px-2 py-2 md:px-4 md:py-2">Name</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Email</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Biodata ID</th>
              <th className="border px-2 py-2 md:px-4 md:py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-sm">
                  No approved premium users.
                </td>
              </tr>
            ) : (
              requests.map(req => (
                <tr key={req._id} className="text-center text-sm md:text-base">
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    {req.name}
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    {req.email}
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    {req.biodataId}
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    <button
                      onClick={() => handleRemovePremium(req.userId)}
                      className="bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Remove Premium
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
