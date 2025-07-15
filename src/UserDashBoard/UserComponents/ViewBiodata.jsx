import React, { useEffect, useState } from 'react';

const ViewBiodata = () => {
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/biodata/me?email=user@example.com')
      .then(res => res.json())
      .then(data => setBiodata(data));
  }, []);

  // if (!biodata) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Biodata</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(biodata, null, 2)}
      </pre>

      <button
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() => alert('Requesting premium')}
      >
        Make Biodata Premium
      </button>
    </div>
  );
};

export default ViewBiodata;
