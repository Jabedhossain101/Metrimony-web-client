import React, { useEffect, useState } from 'react';

const AdminPremiumRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/premium-requests')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRequests(data.filter(r => r.status === 'pending'));
      });
  }, []);

  const handleApprove = async id => {
    const res = await fetch(
      `http://localhost:3000/premium-requests/approve/${id}`,
      {
        method: 'PATCH',
      }
    );

    if (res.ok) {
      alert('Approved!');
      setRequests(prev => prev.filter(req => req._id !== id));
    } else {
      alert('Failed to approve');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Premium Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No pending requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li
              key={req._id}
              className="p-4 border rounded-lg shadow-sm bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="text-sm sm:text-base">
                <p>
                  <strong>Name:</strong> {req.name}
                </p>
                <p>
                  <strong>Email:</strong> {req.email}
                </p>
              </div>

              <button
                onClick={() => handleApprove(req._id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPremiumRequests;
