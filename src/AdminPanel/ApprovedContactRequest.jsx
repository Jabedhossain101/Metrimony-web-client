import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:3000/contact-requests/pending');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching contact requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApproveContact = async id => {
    const confirm = await Swal.fire({
      title: 'Approve this contact request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/contact-requests/approve/${id}`,
        {
          method: 'PATCH',
        }
      );
      const result = await res.json();

      if (result.modifiedCount > 0) {
        Swal.fire('Success!', 'Contact request approved.', 'success');
        fetchRequests();
      } else {
        Swal.fire('Failed', 'Could not approve contact request.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Approved Contact Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border px-2 md:px-4 py-2">Name</th>
              <th className="border px-2 md:px-4 py-2">Email</th>
              <th className="border px-2 md:px-4 py-2">Biodata ID</th>
              <th className="border px-2 md:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No contact requests found.
                </td>
              </tr>
            )}

            {requests.map(req => (
              <tr key={req._id} className="text-center">
                <td className="border px-2 md:px-4 py-2">{req.name}</td>
                <td className="border px-2 md:px-4 py-2">{req.email}</td>
                <td className="border px-2 md:px-4 py-2">{req.biodataId}</td>
                <td className="border px-2 md:px-4 py-2">
                  <button
                    onClick={() => handleApproveContact(req._id)}
                    className="bg-green-600 text-white px-2 md:px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Approve
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

export default ApprovedContactRequest;
