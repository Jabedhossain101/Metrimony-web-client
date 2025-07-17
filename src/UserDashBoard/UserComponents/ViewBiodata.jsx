import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/biodata/me?email=${user.email}`)
        .then(res => res.json())
        .then(data => setBiodata(data));
    }
  }, [user?.email]);

  if (!biodata)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Biodata</h2>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={biodata.profileImage}
          alt={biodata.name}
          className="w-32 h-32 object-cover rounded-full border"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{biodata.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
              <strong>Occupation:</strong> {biodata.occupation}
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
              <strong>Biodata Type:</strong> {biodata.biodataType}
            </p>
            <p>
              <strong>Race:</strong> {biodata.race}
            </p>
            <p>
              <strong>Contact Email:</strong> {biodata.contactEmail}
            </p>
            <p>
              <strong>Mobile Number:</strong> {biodata.mobileNumber}
            </p>
            <p>
              <strong>Expected Partner Age:</strong>{' '}
              {biodata.expectedPartnerAge}
            </p>
            <p>
              <strong>Expected Partner Height:</strong>{' '}
              {biodata.expectedPartnerHeight}
            </p>
            <p>
              <strong>Expected Partner Weight:</strong>{' '}
              {biodata.expectedPartnerWeight}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded transition"
          onClick={() => alert('Requesting premium')}
        >
          Make Biodata Premium
        </button>
      </div>
    </div>
  );
};

export default ViewBiodata;
