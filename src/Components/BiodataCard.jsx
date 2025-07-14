import { Link } from 'react-router';

const BiodataCard = ({ biodata }) => {
  const { id, type, image, division, age, occupation } = biodata;

  return (
    <div>
      <div className="h-16"></div>
      <div className="border rounded-md shadow p-4 w-full max-w-sm">
        <img
          src={image}
          alt="Profile"
          className="h-40 w-40 mx-auto rounded-full mb-4"
        />
        <p className="text-center font-semibold">বায়োডাটা নম্বর: {id}</p>
        <p>বায়োডাটা ধরন: {type}</p>
        <p>বিভাগ: {division}</p>
        <p>বয়স: {age}</p>
        <p>পেশা: {occupation}</p>
        <Link
          to={`/biodata/${id}`}
          className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          সম্পূর্ণ বায়োডাটা
        </Link>
      </div>
    </div>
  );
};

export default BiodataCard;
