import React from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <div className="w-full md:w-1/4 p-4 border-r">
      <div className="h-16"></div>
      <h2 className="text-xl font-bold mb-4">FILTER OPTION</h2>

      <div className="mb-4">
        <label className="block mb-1">Biodata Type</label>
        <select
          className="w-full border p-2"
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Age (Range)</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-1/2 border p-2"
            placeholder="Min"
            onChange={e => setFilters({ ...filters, minAge: e.target.value })}
          />
          <input
            type="number"
            className="w-1/2 border p-2"
            placeholder="Max"
            onChange={e => setFilters({ ...filters, maxAge: e.target.value })}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Division</label>
        <select
          className="w-full border p-2"
          onChange={e => setFilters({ ...filters, division: e.target.value })}
        >
          <option value="">All Division</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Khulna">Khulna</option>
          <option value="Barisal">Barisal</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Sylhet">Sylhet</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
