import React from 'react';
import { FaStar } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

// Example data (replace with your real data or fetch from API)
const stories = [
  {
    id: 1,
    coupleImage: 'https://i.ibb.co/zHTrrFNP/image.png',
    marriageDate: '2024-12-15',
    stars: 5,
    story:
      "We met on this platform and instantly connected. Now we're happily married! Thank you for making our dreams come true.",
    names: 'Rahim & Ayesha',
  },
  {
    id: 2,
    coupleImage: 'https://i.ibb.co/zHTrrFNP/image.png',
    marriageDate: '2023-08-10',
    stars: 4,
    story:
      'A wonderful experience! The site made it easy to find my soulmate. Highly recommended.',
    names: 'Arif & Sultana',
  },
  {
    id: 3,
    coupleImage: 'https://i.ibb.co/zHTrrFNP/image.png',
    marriageDate: '2022-05-22',
    stars: 5,
    story:
      'We are grateful for this website. It brought us together and now we are enjoying our married life.',
    names: 'Naimur & Neha',
  },
  {
    id: 4,
    coupleImage: 'https://i.ibb.co/zHTrrFNP/image.png',
    marriageDate: '2024-06-01',
    stars: 5,
    story:
      'The best matrimony site! We found each other and our families are so happy.',
    names: 'Sourav & Nisha',
  },
  {
    id: 5,
    coupleImage: 'https://i.ibb.co/zHTrrFNP/image.png',
    marriageDate: '2023-11-20',
    stars: 4,
    story:
      'I never thought online matrimony could work, but now I am a believer. Thank you!',
    names: 'Raihan & Farzana',
  },
  {
    id: 6,
    coupleImage: 'https://i.ibb.co/zHTrrFNP/image.png',
    marriageDate: '2022-09-18',
    stars: 5,
    story:
      'We matched, we met, and now we are married! The process was smooth and secure.',
    names: 'Rafsan & Sayma',
  },
];

// Sort stories by marriageDate descending (newest first)
const sortedStories = [...stories].sort(
  (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
);

const SuccessStory = () => (
  <section className="max-w-6xl mx-auto mt-16 px-4 py-12">
    <h2 className="text-3xl font-bold text-center mb-10 text-pink-700">
      Marriage Success Stories
    </h2>
    <Marquee pauseOnHover={true} gradient={false} speed={40}>
      {sortedStories.map(story => (
        <div
          key={story.id}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center mx-4 min-w-[320px] max-w-xs"
        >
          <img
            src={story.coupleImage}
            alt="Couple"
            className="w-28 h-28 object-cover rounded-full border-4 border-pink-200 mb-3"
          />
          <div className="flex flex-col items-center">
            <span className="font-semibold text-pink-600">{story.names}</span>
            <span className="text-gray-500 text-sm mb-1">
              {new Date(story.marriageDate).toLocaleDateString()}
            </span>
            <div className="flex items-center mb-2">
              {[...Array(story.stars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 text-center">{story.story}</p>
          </div>
        </div>
      ))}
    </Marquee>
  </section>
);

export default SuccessStory;
