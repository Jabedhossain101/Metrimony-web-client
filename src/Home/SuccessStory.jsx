import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('https://metrimony-server-ten.vercel.app/success-stories')
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  return (
    <div className="p-6" data-aos="fade-up">
      <h2 className="text-3xl font-bold mb-4 text-center">Success Stories</h2>
      <Marquee pauseOnHover gradient={false} speed={50}>
        {stories.map(story => (
          <div
            key={story._id}
            className="bg-white shadow rounded p-4 mr-6 flex-shrink-0"
            style={{ width: '300px' }}
          >
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
      </Marquee>
    </div>
  );
};

export default SuccessStories;
