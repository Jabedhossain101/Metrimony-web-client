import React, { useEffect, useState } from 'react';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/success-stories')
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Success Stories</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story._id} className="bg-white shadow rounded p-4">
            <img
              src={story.image}
              alt="Couple"
              className="w-full h-48 object-cover rounded mb-3"
            />
            <p className="text-gray-700 mb-2">
              <strong>Biodata IDs:</strong> {story.selfBiodataId} &{' '}
              {story.partnerBiodataId}
            </p>
            <p className="text-sm text-gray-600 italic">"{story.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
