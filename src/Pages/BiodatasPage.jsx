import React, { useEffect, useState } from 'react';
import FilterSidebar from '../Components/FilterSidebar';
import BiodataCard from '../Components/BiodataCard';

const BiodatasPage = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/biodatas')
      .then(res => res.json())
      .then(data => setBiodatas(data));
  }, []);

  const filteredData = biodatas.filter(item => {
    const ageValid =
      (!filters.minAge || item.age >= filters.minAge) &&
      (!filters.maxAge || item.age <= filters.maxAge);
    const typeValid = !filters.type || item.biodataType === filters.type;
    const divisionValid =
      !filters.division || item.permanentDivision === filters.division;
    return ageValid && typeValid && divisionValid;
  });

  return (
    <div className="flex flex-col md:flex-row p-4">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredData.map(biodata => (
          <BiodataCard key={biodata._id} biodata={biodata} />
        ))}
      </div>
    </div>
  );
};

export default BiodatasPage;
