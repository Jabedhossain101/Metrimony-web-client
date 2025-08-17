import React from 'react';

const FeaturedBiodatas = () => {
  const featured = [
    {
      _id: '1',
      name: 'Nusrat Jahan',
      age: '25',
      occupation: 'Doctor',
      image: 'https://i.ibb.co/d483rxhx/image.png',
      location: 'Dhaka',
    },
    {
      _id: '2',
      name: 'Rakib Hasan',
      age: '28',
      occupation: 'Engineer',
      image: 'https://i.ibb.co/vCdbxQLG/image.png',
      location: 'Chittagong',
    },
    {
      _id: '3',
      name: 'Farzana Akter',
      age: '23',
      occupation: 'Student',
      image: 'https://i.ibb.co/d483rxhx/image.png',
      location: 'Sylhet',
    },
  ];

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        🌟 Featured Biodatas
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map(item => (
          <div
            key={item._id}
            className="bg-white border rounded-2xl shadow-lg p-5 text-center hover:shadow-2xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-pink-500"
            />
            <h3 className="text-lg font-bold mt-4 text-pink-700">
              {item.name}
            </h3>
            <p className="text-gray-600">Age: {item.age}</p>
            <p className="text-gray-600">Occupation: {item.occupation}</p>
            <p className="text-gray-600">Location: {item.location}</p>
            <button className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBiodatas;
