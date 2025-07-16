// BiodataDetails.jsx with full API integration and bug fix

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await fetch(`http://localhost:3000/biodatas/${id}`);
        const data = await res.json();
        setBiodata(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching biodata:', error);
        setLoading(false);
      }
    };

    if (id) fetchBiodata();
  }, [id]);

  useEffect(() => {
    const fetchSimilarBiodatas = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/biodatas?type=${biodata.biodataType}`
        );
        const data = await res.json();
        const filtered = data.filter(b => b._id !== biodata._id);
        setSimilarBiodatas(filtered.slice(0, 3));
      } catch (error) {
        console.error('Error fetching similar biodatas:', error);
      }
    };

    if (biodata?.biodataType) fetchSimilarBiodatas();
  }, [biodata]);

  const isPremium = user?.role === 'premium';

  const handleAddToFavourites = async () => {
    const favData = {
      userEmail: user?.email,
      biodataId: biodata._id,
      name: biodata.name,
      occupation: biodata.occupation,
      permanentDivision: biodata.permanentDivision,
    };

    try {
      const res = await fetch('http://localhost:3000/favourites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favData),
      });
      const result = await res.json();
      if (result.insertedId) {
        alert('Added to favourites!');
      } else {
        alert('Already in favourites or error occurred.');
      }
    } catch (err) {
      console.error('Error adding to favourites:', err);
    }
  };

  const handleRequestContact = async () => {
    const requestData = {
      userEmail: user?.email,
      biodataId: biodata._id,
      name: biodata.name,
      status: 'pending',
    };

    try {
      const res = await fetch('http://localhost:3000/contact-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      const result = await res.json();
      if (result.insertedId) {
        alert('Request submitted! Wait for admin approval.');
      } else {
        alert('Already requested or something went wrong.');
      }
      navigate(`/checkout/${biodata._id}`);
    } catch (err) {
      console.error('Error requesting contact:', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!biodata)
    return <p className="text-center text-red-500">No biodata found!</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="h-16"></div>
      <h2 className="text-2xl font-bold mb-4">বায়োডাটা নম্বর: {biodata._id}</h2>
      <img
        src={biodata.profileImage}
        alt="Profile"
        className="w-40 h-40 rounded-full mb-4 mx-auto object-cover border-4 border-pink-300"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p>বায়োডাটা ধরন: {biodata.biodataType}</p>
        <p>স্থায়ী বিভাগ: {biodata.permanentDivision}</p>
        <p>বর্তমান বিভাগ: {biodata.presentDivision}</p>
        <p>বয়স: {biodata.age}</p>
        <p>ওজন: {biodata.weight}</p>
        <p>উচ্চতা: {biodata.height}</p>
        <p>জন্ম তারিখ: {biodata.dob}</p>
        <p>পেশা: {biodata.occupation}</p>
        <p>স্কিন কালার: {biodata.race}</p>
        <p>পিতার নাম: {biodata.fathersName}</p>
        <p>মাতার নাম: {biodata.mothersName}</p>
        <p>প্রত্যাশিত সঙ্গীর বয়স: {biodata.expectedPartnerAge}</p>
        <p>প্রত্যাশিত উচ্চতা: {biodata.expectedPartnerHeight}</p>
        <p>প্রত্যাশিত ওজন: {biodata.expectedPartnerWeight}</p>
      </div>

      {isPremium ? (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <p>Email: {biodata.contactEmail}</p>
          <p>Phone: {biodata.mobileNumber}</p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-red-500">
            কন্টাক্ট ইনফো শুধুমাত্র প্রিমিয়াম মেম্বারদের জন্য!
          </p>
          <button
            onClick={handleRequestContact}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Request Contact Information
          </button>
        </div>
      )}

      <button
        onClick={handleAddToFavourites}
        className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
      >
        Add to Favourites
      </button>

      {/* Similar Biodatas */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Similar Biodatas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {similarBiodatas.map(sb => (
            <div key={sb._id} className="border p-4 rounded shadow">
              <img
                src={sb.profileImage}
                alt=""
                className="w-20 h-20 rounded-full mb-2 mx-auto"
              />
              <p className="text-center">ID: {sb._id}</p>
              <p className="text-center">Age: {sb.age}</p>
              <p className="text-center">Division: {sb.permanentDivision}</p>
              <p className="text-center">Occupation: {sb.occupation}</p>
              <button
                onClick={() => navigate(`/biodata/${sb._id}`)}
                className="mt-2 text-sm bg-gray-200 px-2 py-1 rounded block mx-auto"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
