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
    <div>
      <h2 className="text-2xl font-bold mb-4">Approved Contact Requests</h2>
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
                No contact requests found.
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
                  onClick={() => handleApproveContact(req._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedContactRequest;
