import React from 'react';
import { Link } from 'react-router';

const BiodataCard = ({ biodata }) => {
  const { _id, profileImage, biodataType, permanentDivision, age, occupation } =
    biodata;

  return (
    <div>
      <div className="h-12"></div>
      <div className="border rounded-xl shadow-lg p-4 w-full max-w-sm bg-white">
        <img
          src={profileImage}
          alt="Profile"
          className="h-40 w-40 mx-auto rounded-full border-4 border-pink-400 object-cover mb-4"
        />
        <p className="text-center text-lg font-bold text-pink-600 mb-2">
          বায়োডাটা নম্বর: {_id}
        </p>
        <div className="text-gray-700 space-y-1">
          <p>ধরণ: {biodataType}</p>
          <p>বিভাগ: {permanentDivision}</p>
          <p>বয়স: {age}</p>
          <p>পেশা: {occupation}</p>
        </div>
        <Link
          to={`/biodata/${_id}`}
          className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full text-center"
        >
          সম্পূর্ণ বায়োডাটা
        </Link>
      </div>
    </div>
  );
};

export default BiodataCard;
