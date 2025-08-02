import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';

const AddedMember = () => {
  const { user } = useContext(AuthContext); // ✅ using logged-in user
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Check if biodata already submitted
  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://metrimony-server-ten.vercel.app/biodatas/me?email=${user.email}`
    )
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) setAlreadySubmitted(true);
      })
      .catch(err => console.error('Check failed:', err));
  }, [user?.email]);

  const onSubmit = async data => {
    if (!user?.email) {
      toast.error('❌ User not logged in');
      return;
    }

    data.contactEmail = user.email; // ✅ Set logged in user's email

    try {
      const res = await fetch(
        'https://metrimony-server-ten.vercel.app/biodatas',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        toast.success('🎉 Biodata submitted successfully!');
        reset();
        setAlreadySubmitted(true);
      } else {
        const err = await res.json();
        toast.error(err.message || '❌ Submission failed');
      }
    } catch (error) {
      toast.error('❌ Server error');
    }
  };

  const divisions = [
    'Dhaka',
    'Chattagram',
    'Rangpur',
    'Barisal',
    'Khulna',
    'Mymensingh',
    'Sylhet',
    'Rajshahi',
  ];
  const skinColors = ['Fair', 'Medium', 'Dark'];
  const biodataTypes = ['male', 'female'];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="h-10" />
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Submit Your Biodata
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Fields */}
        {[
          { name: 'name', label: 'Full Name', type: 'text' },
          { name: 'profileImage', label: 'Profile Image URL', type: 'text' },
          { name: 'dob', label: 'Date of Birth', type: 'date' },
          { name: 'height', label: 'Height', type: 'text' },
          { name: 'weight', label: 'Weight', type: 'text' },
          { name: 'age', label: 'Age', type: 'number' },
          { name: 'occupation', label: 'Occupation', type: 'text' },
          { name: 'fathersName', label: "Father's Name", type: 'text' },
          { name: 'mothersName', label: "Mother's Name", type: 'text' },
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

        {/* Biodata Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biodata Type
          </label>
          <select
            {...register('biodataType', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            {biodataTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.biodataType && (
            <p className="text-red-500 text-sm mt-1">
              Biodata Type is required
            </p>
          )}
        </div>

        {/* Skin Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skin Color
          </label>
          <select
            {...register('race', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Skin Color</option>
            {skinColors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          {errors.race && (
            <p className="text-red-500 text-sm mt-1">Skin Color is required</p>
          )}
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Permanent Division
          </label>
          <select
            {...register('permanentDivision', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Division</option>
            {divisions.map(div => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors.permanentDivision && (
            <p className="text-red-500 text-sm mt-1">
              Permanent Division is required
            </p>
          )}
        </div>

        {/* Present Division */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Present Division
          </label>
          <select
            {...register('presentDivision', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Division</option>
            {divisions.map(div => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors.presentDivision && (
            <p className="text-red-500 text-sm mt-1">
              Present Division is required
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={alreadySubmitted}
          className={`w-full ${
            alreadySubmitted ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-3 mt-4 rounded-md font-semibold transition`}
        >
          {alreadySubmitted ? 'Already Submitted' : 'Submit Biodata'}
        </button>
      </form>
    </div>
  );
};

export default AddedMember;
