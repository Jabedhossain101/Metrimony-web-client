import { useState } from 'react';
import BiodataCard from './BiodataCard'; // Single Card Component

const BiodataCardList = ({ biodataList }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleBiodatas = showAll ? biodataList : biodataList.slice(0, 6);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBiodatas.map(biodata => (
          <BiodataCard key={biodata.id} biodata={biodata} />
        ))}
      </div>

      {biodataList.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>
  );
};

export default BiodataCardList;
