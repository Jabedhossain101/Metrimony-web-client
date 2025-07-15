import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddedMember = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const res = await fetch('http://localhost:3000/biodatas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('🎉 Biodata submitted successfully!');
        reset();
      } else {
        toast.error('❌ Submission failed');
      }
    } catch (error) {
      toast.error('❌ Server error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="h-10"></div>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Submit Your Biodata
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Each input with label */}
        {[
          { name: 'name', label: 'Full Name', type: 'text' },
          { name: 'profileImage', label: 'Profile Image URL', type: 'text' },
          { name: 'dob', label: 'Date of Birth', type: 'date' },
          { name: 'height', label: 'Height', type: 'text' },
          { name: 'weight', label: 'Weight', type: 'text' },
          { name: 'age', label: 'Age', type: 'number' },
          { name: 'occupation', label: 'Occupation', type: 'text' },
          { name: 'race', label: 'Skin Color', type: 'text' },
          { name: 'fathersName', label: "Father's Name", type: 'text' },
          { name: 'mothersName', label: "Mother's Name", type: 'text' },
          {
            name: 'permanentDivision',
            label: 'Permanent Division',
            type: 'text',
          },
          { name: 'presentDivision', label: 'Present Division', type: 'text' },
          {
            name: 'expectedPartnerAge',
            label: 'Expected Partner Age',
            type: 'number',
          },
          {
            name: 'expectedPartnerHeight',
            label: 'Expected Partner Height',
            type: 'text',
          },
          {
            name: 'expectedPartnerWeight',
            label: 'Expected Partner Weight',
            type: 'text',
          },
          { name: 'contactEmail', label: 'Contact Email', type: 'email' },
          { name: 'mobileNumber', label: 'Mobile Number', type: 'text' },
        ].map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              {...register(field.name, { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${field.label}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {field.label} is required
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-md font-semibold transition"
        >
          Submit Biodata
        </button>
      </form>
    </div>
  );
};

export default AddedMember;
