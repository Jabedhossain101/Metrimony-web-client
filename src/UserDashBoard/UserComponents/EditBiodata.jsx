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
      className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Edit Biodata</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Biodata Type */}
        <div>
          <label className="block font-medium mb-1">Biodata Type</label>
          <select {...register('biodataType')} className="input w-full">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Name</label>
          <input {...register('name')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Profile Image URL</label>
          <input {...register('profileImage')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input type="date" {...register('dob')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Height</label>
          <input {...register('height')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Weight</label>
          <input {...register('weight')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Age</label>
          <input type="number" {...register('age')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Occupation</label>
          <input {...register('occupation')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Skin Color</label>
          <input {...register('race')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Father's Name</label>
          <input {...register('fathersName')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <input {...register('mothersName')} className="input w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Permanent Division</label>
          <select {...register('permanentDivision')} className="input w-full">
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
          <label className="block font-medium mb-1">Present Division</label>
          <select {...register('presentDivision')} className="input w-full">
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
          <label className="block font-medium mb-1">Expected Partner Age</label>
          <input
            type="number"
            {...register('expectedPartnerAge')}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Expected Partner Height
          </label>
          <input
            {...register('expectedPartnerHeight')}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Expected Partner Weight
          </label>
          <input
            {...register('expectedPartnerWeight')}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact Email</label>
          <input
            type="email"
            {...register('contactEmail')}
            className="input w-full"
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input {...register('mobileNumber')} className="input w-full" />
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          Save & Publish Now
        </button>
      </div>
    </form>
  );
};

export default EditBiodata;
