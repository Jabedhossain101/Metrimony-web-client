import React, { useEffect, useState } from 'react';

const AdminPremiumRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('https://metrimony-server-ten.vercel.app/premium-requests')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRequests(data.filter(r => r.status === 'pending'));
      });
  }, []);

  const handleApprove = async id => {
    const res = await fetch(
      `https://metrimony-server-ten.vercel.app/premium-requests/approve/${id}`,
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Premium Requests</h2>
      <ul>
        {requests.map(req => (
          <li
            key={req._id}
            className="p-4 border mb-2 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Name:</strong> {req.name}
              </p>
              <p>
                <strong>Email:</strong> {req.email}
              </p>
            </div>
            <button
              onClick={() => handleApprove(req._id)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPremiumRequests;
