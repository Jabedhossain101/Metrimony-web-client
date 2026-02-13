import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContext';
import { NavLink } from 'react-router';
import {
  HiOutlineSave,
  HiOutlinePlusCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const [hasBiodata, setHasBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://metrimony-server-ten.vercel.app/biodata/me?email=${user.email}`,
      )
        .then(res => res.json())
        .then(data => {
          if (data && data._id) {
            setHasBiodata(true);
            reset(data);
          } else {
            setHasBiodata(false);
          }
          setLoading(false);
        })
        .catch(() => {
          toast.error('Failed to load biodata');
          setHasBiodata(false);
          setLoading(false);
        });
    }
  }, [user?.email, reset]);

  const onSubmit = async data => {
    const loadingToast = toast.loading('Updating your profile...');
    try {
      const res = await fetch(
        `https://metrimony-server-ten.vercel.app/biodatas/${data._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (res.ok) {
        toast.success('Biodata updated successfully!', { id: loadingToast });
      } else {
        toast.error('Failed to update biodata', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Server connection error', { id: loadingToast });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">
          Fetching Profile Data...
        </p>
      </div>
    );

  return (
    <div className="animate-in fade-in duration-500">
      {!hasBiodata ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-slate-800/20 border border-dashed border-slate-700 rounded-[32px]">
          <div className="bg-emerald-500/10 p-4 rounded-full mb-6">
            <HiOutlinePlusCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            No Biodata Found
          </h3>
          <p className="text-slate-400 max-w-md mb-8">
            You haven't created a biodata yet. Creating one allows others to
            find you and helps you find your perfect match.
          </p>
          <NavLink
            to="/added-member"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Create Your Biodata Now
          </NavLink>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Edit Biodata
              </h2>
              <p className="text-slate-500 mt-1">
                Keep your profile updated to get better matches.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/20 text-sm">
              <HiOutlineInformationCircle className="w-5 h-5" />
              <span>Public Profile</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Section: Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              <FormGroup label="Biodata Type">
                <select {...register('biodataType')} className="input-field">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </FormGroup>

              <FormGroup label="Full Name">
                <input
                  {...register('name')}
                  placeholder="Enter full name"
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Profile Image URL">
                <input
                  {...register('profileImage')}
                  placeholder="https://..."
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Date of Birth">
                <input
                  type="date"
                  {...register('dob')}
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Height">
                <input
                  {...register('height')}
                  placeholder="e.g. 5'7\"
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Weight">
                <input
                  {...register('weight')}
                  placeholder="e.g. 70kg"
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Age">
                <input
                  type="number"
                  {...register('age')}
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Occupation">
                <input
                  {...register('occupation')}
                  placeholder="Software Engineer"
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Skin Color (Race)">
                <input
                  {...register('race')}
                  placeholder="Fair / Bright"
                  className="input-field"
                />
              </FormGroup>

              <FormGroup label="Father's Name">
                <input {...register('fathersName')} className="input-field" />
              </FormGroup>

              <FormGroup label="Mother's Name">
                <input {...register('mothersName')} className="input-field" />
              </FormGroup>

              <FormGroup label="Permanent Division">
                <select
                  {...register('permanentDivision')}
                  className="input-field"
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
              </FormGroup>

              <FormGroup label="Present Division">
                <select
                  {...register('presentDivision')}
                  className="input-field"
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
              </FormGroup>
            </div>

            {/* Section: Partner Preferences */}
            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                Partner Expectations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FormGroup label="Expected Age">
                  <input
                    type="number"
                    {...register('expectedPartnerAge')}
                    className="input-field"
                  />
                </FormGroup>

                <FormGroup label="Expected Height">
                  <input
                    {...register('expectedPartnerHeight')}
                    className="input-field"
                  />
                </FormGroup>

                <FormGroup label="Expected Weight">
                  <input
                    {...register('expectedPartnerWeight')}
                    className="input-field"
                  />
                </FormGroup>
              </div>
            </div>

            {/* Section: Contact Info */}
            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-xl font-semibold text-white mb-6">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormGroup label="Contact Email (System Locked)">
                  <input
                    type="email"
                    {...register('contactEmail')}
                    className="input-field bg-slate-800/50 text-slate-500 cursor-not-allowed opacity-70"
                    readOnly
                  />
                </FormGroup>
                <FormGroup label="Mobile Number">
                  <input
                    {...register('mobileNumber')}
                    placeholder="+88017..."
                    className="input-field"
                  />
                </FormGroup>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="flex justify-end pt-10">
              <button
                type="submit"
                className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95"
              >
                <HiOutlineSave className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Save & Update Biodata
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Internal CSS for the Ultra-Pro Inputs */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .input-field {
          width: 100%;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 12px 16px;
          color: #f8fafc;
          transition: all 0.3s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: #10b981;
          background: #0f172a;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        .input-field::placeholder {
          color: #475569;
        }
      `,
        }}
      />
    </div>
  );
};

// Helper Component for consistency
const FormGroup = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-400 ml-1">{label}</label>
    {children}
  </div>
);

export default EditBiodata;
