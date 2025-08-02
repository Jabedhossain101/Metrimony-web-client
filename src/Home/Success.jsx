import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const Success = () => {
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(
          'https://metrimony-server-ten.vercel.app/success-stories'
        );
        const data = await res.json();

        // Sort by marriageDate descending (newest first)
        const sorted = data.sort(
          (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
        );
        setSuccessStories(sorted);
      } catch (err) {
        console.error('Failed to load success stories:', err);
      }
    };

    fetchStories();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Marriage Success Stories
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {successStories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    story.image || 'https://i.ibb.co/vCdbxQLG/image.png' // default fallback
                  }
                  alt="Couple"
                  className="w-16 h-16 object-cover rounded-full border-2 border-indigo-500"
                />
                <div>
                  <p className="text-sm text-gray-500">Married on</p>
                  <p className="font-medium text-gray-800">
                    {story.marriageDate
                      ? new Date(story.marriageDate).toDateString()
                      : 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Review Star */}
              <div className="flex items-center mb-2">
                {[...Array(story.reviewStar || 0)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
                {[...Array(5 - (story.reviewStar || 0))].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
                ))}
              </div>

              {/* Success Text */}
              <p className="text-gray-700 text-sm line-clamp-5 italic">
                "{story.review}"
              </p>

              {/* Optional biodata IDs */}
              <p className="text-xs text-gray-500 mt-3">
                Biodata IDs: <strong>{story.selfBiodataId}</strong> &{' '}
                <strong>{story.partnerBiodataId}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Success;
