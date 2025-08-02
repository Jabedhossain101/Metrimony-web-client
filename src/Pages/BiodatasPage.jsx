import React, { useEffect, useState } from 'react';
import FilterSidebar from '../Components/FilterSidebar';
import BiodataCard from '../Components/BiodataCard';

const BiodatasPage = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://metrimony-server-ten.vercel.app/biodatas')
      .then(res => res.json())
      .then(data => setBiodatas(data));
  }, []);

  // Filtering
  const filteredData = biodatas.filter(item => {
    const ageValid =
      (!filters.minAge || item.age >= filters.minAge) &&
      (!filters.maxAge || item.age <= filters.maxAge);
    const typeValid = !filters.type || item.biodataType === filters.type;
    const divisionValid =
      !filters.division || item.permanentDivision === filters.division;
    return ageValid && typeValid && divisionValid;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`px-3 py-1 border rounded ${
              currentPage === i ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pages.push(<span key={i}>...</span>);
      }
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {pages}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="w-full md:w-3/4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map(biodata => (
            <BiodataCard key={biodata._id} biodata={biodata} />
          ))}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default BiodatasPage;
