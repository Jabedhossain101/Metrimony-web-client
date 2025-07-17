import React, { useState } from 'react';
import Swal from 'sweetalert2';

const GotMarried = () => {
  const [formData, setFormData] = useState({
    selfBiodataId: '',
    partnerBiodataId: '',
    image: '',
    review: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/success-stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire('Success', 'Story submitted successfully!', 'success');
      setFormData({
        selfBiodataId: '',
        partnerBiodataId: '',
        image: '',
        review: '',
      });
    } else {
      Swal.fire('Error', data.message || 'Submission failed', 'error');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Got Married Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="selfBiodataId"
          value={formData.selfBiodataId}
          onChange={handleChange}
          placeholder="Your Biodata ID"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="partnerBiodataId"
          value={formData.partnerBiodataId}
          onChange={handleChange}
          placeholder="Partner Biodata ID"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Couple Image URL"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Write your success story"
          rows="4"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
