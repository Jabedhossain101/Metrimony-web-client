import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [biodatas, setBiodatas] = useState([]);
  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);

  useEffect(() => {
    fetch('/biodata.json') // or API
      .then(res => res.json())
      .then(data => {
        setBiodatas(data);
        const found = data.find(b => b.id == id);
        setBiodata(found);

        // Get similar biodatas
        const sameType = data.filter(
          b => b.type === found?.type && b.id != found?.id
        );
        setSimilarBiodatas(sameType.slice(0, 3));
      });
  }, [id]);

  if (!biodata) return <p>Loading...</p>;

  const isPremium = user?.role === 'premium'; // Adjust logic based on your system

  const handleAddToFavourites = () => {
    // POST to /api/favourites or update local storage/context
    console.log('Added to favourites:', biodata.id);
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="h-16"></div>
      <h2 className="text-2xl font-bold mb-4">বায়োডাটা নম্বর: {biodata.id}</h2>
      <img
        src={biodata.image}
        alt="Profile"
        className="w-40 h-40 rounded-full mb-4"
      />
      <p>বায়োডাটা ধরন: {biodata.type}</p>
      <p>বিভাগ: {biodata.division}</p>
      <p>বয়স: {biodata.age}</p>
      <p>পেশা: {biodata.occupation}</p>
      <p>ওজন: {biodata.weight}</p>
      <p>উচ্চতা: {biodata.height}</p>
      <p>জন্ম তারিখ: {biodata.birthDate}</p>
      <p>শিক্ষাগত যোগ্যতা: {biodata.education}</p>
      <p>শিক্ষাগত যোগ্যতা:</p>
      <ul>
        {biodata.educationalQualifications.map((edu, index) => (
          <li key={index}>
            {edu.degree} - {edu.institution} ({edu.year})
          </li>
        ))}
      </ul>

      <p>ধর্ম: {biodata.religion}</p>

      {/* Conditional Contact Info */}
      {isPremium ? (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <p>Email: {biodata.email || 'example@email.com'}</p>
          <p>Phone: {biodata.phone || '01XXXXXXXXX'}</p>
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
            <div key={sb.id} className="border p-4 rounded shadow">
              <img
                src={sb.image}
                alt=""
                className="w-20 h-20 rounded-full mb-2"
              />
              <p>ID: {sb.id}</p>
              <p>Age: {sb.age}</p>
              <p>Division: {sb.division}</p>
              <p>Occupation: {sb.occupation}</p>
              <button
                onClick={() => navigate(`/biodata/${sb.id}`)}
                className="mt-2 text-sm bg-gray-200 px-2 py-1 rounded"
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
