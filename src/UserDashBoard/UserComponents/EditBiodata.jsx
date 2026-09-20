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
  const { user, loading: authLoading } = useContext(AuthContext);
  const [hasBiodata, setHasBiodata] = useState(false);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (authLoading) return;

    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchBiodata = async () => {
      try {
        const res = await fetch(
          `https://metrimony-server-ten.vercel.app/biodata/me?email=${user.email}`
        );
        if (!res.ok) {
          throw new Error('Not found');
        }
        
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (data && data._id) {
          setHasBiodata(true);
          reset(data);
        } else {
          setHasBiodata(false);
          reset({ name: user.name || '', contactEmail: user.email });
        }
      } catch (err) {
        console.error('Failed to load biodata:', err);
        setHasBiodata(false);
        reset({ name: user.name || '', contactEmail: user.email });
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [user, authLoading, reset]);

  const onSubmit = async data => {
    const loadingToast = toast.loading(hasBiodata ? 'Updating your profile...' : 'Creating your profile...');
    
    // Auto-attach user email to ensure consistency
    data.contactEmail = user.email;

    const url = hasBiodata 
      ? `https://metrimony-server-ten.vercel.app/biodatas/${data._id}`
      : `https://metrimony-server-ten.vercel.app/biodatas`;
      
    const method = hasBiodata ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(hasBiodata ? 'Biodata updated successfully!' : 'Biodata created successfully!', { id: loadingToast });
        if (!hasBiodata) setHasBiodata(true);
      } else {
        toast.error('Failed to save biodata', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Server connection error', { id: loadingToast });
    }
  };

  if (loading || authLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground font-medium">
          Loading Profile Data...
        </p>
      </div>
    );

  return (
    <div className="animate-in fade-in duration-500">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground tracking-tight">
                {hasBiodata ? 'Edit Biodata' : 'Create Biodata'}
              </h2>
              <p className="text-muted-foreground mt-1">
                {hasBiodata ? 'Keep your profile updated to get better matches.' : 'Complete your profile to start finding matches.'}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg border border-primary/20 text-sm font-bold tracking-wide uppercase">
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
                <HiOutlineSave className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                {hasBiodata ? 'Save & Update Biodata' : 'Create Biodata'}
              </button>
            </div>
          </form>
        </div>

      {/* Internal CSS for the Ultra-Pro Inputs */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .input-field {
          width: 100%;
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 16px;
          color: var(--foreground);
          transition: all 0.3s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: var(--primary);
          background: var(--background);
          box-shadow: 0 0 0 4px rgba(159, 18, 57, 0.1);
        }
        .input-field::placeholder {
          color: var(--muted-foreground);
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
    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">{label}</label>
    {children}
  </div>
);

export default EditBiodata;
