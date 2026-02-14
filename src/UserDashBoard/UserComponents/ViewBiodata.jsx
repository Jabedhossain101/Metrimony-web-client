import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import {
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineSparkles,
  HiBadgeCheck,
  HiOutlineCake,
  HiOutlineArrowsExpand,
} from 'react-icons/hi';

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://metrimony-server-ten.vercel.app/biodata/me?email=${user.email}`,
      )
        .then(res => res.json())
        .then(data => {
          setBiodata(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handlePremiumRequest = () => {
    Swal.fire({
      title: 'Upgrade to Premium?',
      text: 'Boost your profile visibility to find matches faster!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#fbbf24',
      cancelButtonColor: '#334155',
      confirmButtonText: 'Submit Request',
      background: '#1e293b', // Lighter navy for better modal contrast
      color: '#ffffff',
    }).then(result => {
      if (result.isConfirmed) {
        fetch('https://metrimony-server-ten.vercel.app/premium-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            biodataId: biodata._id,
            email: user.email,
            name: biodata.name,
          }),
        })
          .then(res => res.json())
          .then(() => {
            Swal.fire({
              title: 'Request Sent!',
              icon: 'success',
              background: '#1e293b',
              color: '#ffffff',
            });
            setRequestSent(true);
          });
      }
    });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );

  if (!biodata)
    return (
      <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
        <HiOutlineUser className="w-16 h-16 mx-auto mb-4 text-slate-700" />
        <p className="text-slate-400 font-medium">
          No biodata found. Please create one first.
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      {/* Top Profile Header */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-[32px] p-6 md:p-10 mb-8 shadow-2xl">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group">
            <div className="w-44 h-44 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl group-hover:border-emerald-500/50 transition-colors duration-500">
              <img
                src={biodata.profileImage}
                className="w-full h-full object-cover"
                alt={biodata.name}
              />
            </div>
            {biodata.isPremium && (
              <div className="absolute -top-3 -right-3 bg-amber-500 text-slate-900 p-1.5 rounded-full border-4 border-slate-900 shadow-lg">
                <HiBadgeCheck className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {biodata.name}
              </h1>
              <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                {biodata.biodataType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg text-emerald-400">
                  <HiOutlineBriefcase className="w-5 h-5" />
                </div>
                <span className="font-medium">{biodata.occupation}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                  <HiOutlineLocationMarker className="w-5 h-5" />
                </div>
                <span className="font-medium">{biodata.presentDivision}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Stats */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-[28px] p-8 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <HiOutlineUser className="text-emerald-500" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <DetailBox
                label="Age"
                value={`${biodata.age} Years`}
                icon={<HiOutlineCake />}
              />
              <DetailBox
                label="Birth Date"
                value={biodata.dob}
                icon={<HiOutlineCake />}
              />
              <DetailBox
                label="Height"
                value={biodata.height}
                icon={<HiOutlineArrowsExpand />}
              />
              <DetailBox
                label="Weight"
                value={biodata.weight}
                icon={<HiOutlineArrowsExpand />}
              />
              <DetailBox
                label="Skin Tone"
                value={biodata.race}
                icon={<HiOutlineUser />}
              />
              <DetailBox
                label="Father's Name"
                value={biodata.fathersName}
                icon={<HiOutlineUser />}
              />
              <DetailBox
                label="Mother's Name"
                value={biodata.mothersName}
                icon={<HiOutlineUser />}
              />
              <DetailBox
                label="Permanent Address"
                value={biodata.permanentDivision}
                icon={<HiOutlineLocationMarker />}
              />
            </div>
          </section>
        </div>

        {/* Right Column: Contact & Partner */}
        <div className="space-y-8">
          {/* Verified Contact Card */}
          <section className="bg-emerald-500/5 border border-slate-800 rounded-[28px] p-6">
            <h3 className="text-lg font-bold text-black mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Email Address
                </p>
                <p className="text-white font-medium break-all">
                  {biodata.contactEmail}
                </p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Mobile Number
                </p>
                <p className="text-white font-medium">{biodata.mobileNumber}</p>
              </div>
            </div>
          </section>

          {/* Preference Card */}
          <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-[28px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <HiOutlineSparkles className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-pink-500 mb-6">
              Expectations
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Partner Age</span>
                <span className="text-pink-500 font-bold">
                  {biodata.expectedPartnerAge} yrs
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Min Height</span>
                <span className="text-pink-500 font-medium">
                  {biodata.expectedPartnerHeight}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Min Weight</span>
                <span className="text-pink-500 font-medium">
                  {biodata.expectedPartnerWeight}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Action Area: Premium Request */}
      {!biodata.isPremium && (
        <div className="mt-12 text-center p-8 bg-slate-900 border border-slate-800 rounded-[32px]">
          <h4 className="text-xl font-bold text-white mb-2">
            Want to stand out?
          </h4>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Get the Premium badge and appear at the top of search results to
            find your match 3x faster.
          </p>
          <button
            onClick={handlePremiumRequest}
            disabled={requestSent}
            className="w-full md:w-auto px-12 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 disabled:bg-slate-800 disabled:text-slate-600 uppercase tracking-widest text-sm"
          >
            {requestSent ? 'Request Pending...' : 'Upgrade To Premium'}
          </button>
        </div>
      )}
    </div>
  );
};

// Custom Component for Detail Rows to ensure color consistency
const DetailBox = ({ label, value, icon }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-slate-500">{icon}</div>
    <div>
      <p className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-slate-200 font-semibold text-base leading-tight">
        {value || 'Not Provided'}
      </p>
    </div>
  </div>
);

export default ViewBiodata;
