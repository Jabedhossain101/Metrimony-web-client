import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContext';

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/biodata/me?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          reset(data); // pre-fill the form
          setLoading(false);
        })
        .catch(err => {
          toast.error('Failed to load biodata');
          setLoading(false);
        });
    }
  }, [user?.email, reset]);

  const onSubmit = async data => {
    try {
      const res = await fetch(`http://localhost:3000/biodatas/${data._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('✅ Biodata updated successfully!');
      } else {
        toast.error('❌ Failed to update biodata');
      }
    } catch (err) {
      toast.error('❌ Server error');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto p-8  bg-gradient-to-br from-pink-100 to-blue-100 rounded-3xl shadow-2xl space-y-8"
    >
      <h2 className="text-3xl font-extrabold text-center text-pink-700 dark:text-pink-400 mb-6 tracking-wide">
        Edit Your Biodata
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Biodata Type */}
        <div>
          <label className="block font-semibold mb-2 text-black ">
            Biodata Type
          </label>
          <select
            {...register('biodataType')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Name</label>
          <input
            {...register('name')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Profile Image URL</label>
          <input
            {...register('profileImage')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2  ">Date of Birth</label>
          <input
            type="date"
            {...register('dob')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Height</label>
          <input
            {...register('height')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Weight</label>
          <input
            {...register('weight')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Age</label>
          <input
            type="number"
            {...register('age')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Occupation</label>
          <input
            {...register('occupation')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Skin Color</label>
          <input
            {...register('race')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Father's Name</label>
          <input
            {...register('fathersName')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Mother's Name</label>
          <input
            {...register('mothersName')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">
            Permanent Division
          </label>
          <select
            {...register('permanentDivision')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          >
            {[
              'Dhaka',
              'Chattagram',
              'Rangpur',
              'Barisal',
              'Khulna',
              'Mymensingh',
              'Sylhet',
            ].map(div => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Present Division</label>
          <select
            {...register('presentDivision')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          >
            {[
              'Dhaka',
              'Chattagram',
              'Rangpur',
              'Barisal',
              'Khulna',
              'Mymensingh',
              'Sylhet',
            ].map(div => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 ">
            Expected Partner Age
          </label>
          <input
            type="number"
            {...register('expectedPartnerAge')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">
            Expected Partner Height
          </label>
          <input
            {...register('expectedPartnerHeight')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">
            Expected Partner Weight
          </label>
          <input
            {...register('expectedPartnerWeight')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Contact Email</label>
          <input
            type="email"
            {...register('contactEmail')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            readOnly
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 ">Mobile Number</label>
          <input
            {...register('mobileNumber')}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white  focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 text-lg"
        >
          Save &amp; Publish Now
        </button>
      </div>
    </form>
  );
};

export default EditBiodata;
