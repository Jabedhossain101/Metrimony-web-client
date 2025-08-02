import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://metrimony-server-ten.vercel.app/biodata/me?email=${user.email}`
      )
        .then(res => res.json())
        .then(data => setBiodata(data));
    }
  }, [user?.email]);

  const handlePremiumRequest = () => {
    fetch('https://metrimony-server-ten.vercel.app/premium-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        biodataId: biodata._id,
        email: user.email,
        name: biodata.name,
      }),
    })
      .then(res => res.json())
      .then(() => {
        alert('Request sent successfully!');
        setRequestSent(true);
      });
  };

  if (!biodata) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <img
        src={biodata.profileImage}
        className="w-32 h-32 rounded-full mx-auto"
        alt={biodata.name}
      />
      <h2 className="text-2xl font-semibold text-center mt-2">
        {biodata.name}
      </h2>
      <p className="text-center text-gray-600">{biodata.occupation}</p>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          <strong>Name:</strong> {biodata.name}
        </p>
        <p>
          <strong>Biodata Type:</strong> {biodata.biodataType}
        </p>
        <p>
          <strong>Age:</strong> {biodata.age}
        </p>
        <p>
          <strong>Date of Birth:</strong> {biodata.dob}
        </p>
        <p>
          <strong>Height:</strong> {biodata.height}
        </p>
        <p>
          <strong>Weight:</strong> {biodata.weight}
        </p>
        <p>
          <strong>Race:</strong> {biodata.race}
        </p>
        <p>
          <strong>Father's Name:</strong> {biodata.fathersName}
        </p>
        <p>
          <strong>Mother's Name:</strong> {biodata.mothersName}
        </p>
        <p>
          <strong>Permanent Division:</strong> {biodata.permanentDivision}
        </p>
        <p>
          <strong>Present Division:</strong> {biodata.presentDivision}
        </p>
        <p>
          <strong>Contact Email:</strong> {biodata.contactEmail}
        </p>
        <p>
          <strong>Mobile Number:</strong> {biodata.mobileNumber}
        </p>

        <p className="mt-3 font-semibold text-gray-700">
          Expected Partner Info:
        </p>
        <p>
          <strong>Age:</strong> {biodata.expectedPartnerAge}
        </p>
        <p>
          <strong>Height:</strong> {biodata.expectedPartnerHeight}
        </p>
        <p>
          <strong>Weight:</strong> {biodata.expectedPartnerWeight}
        </p>
      </div>

      <button
        className="mt-6 px-4 py-2 w-full bg-yellow-500 text-white rounded disabled:bg-gray-300"
        onClick={handlePremiumRequest}
        disabled={requestSent}
      >
        {requestSent ? 'Request Sent' : 'Make Biodata Premium'}
      </button>
    </div>
  );
};

export default ViewBiodata;
