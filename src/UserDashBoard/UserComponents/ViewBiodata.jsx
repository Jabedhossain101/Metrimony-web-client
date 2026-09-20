import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
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
  const { user, loading: authLoading } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(true);

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
        if (!res.ok) throw new Error('Not found');
        
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        
        if (data && data._id) {
          setBiodata(data);
        } else {
          setBiodata(null);
        }
      } catch (err) {
        console.error('Failed to load biodata:', err);
        setBiodata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [user, authLoading]);

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

  if (loading || authLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );

  if (!biodata)
    return (
      <div className="text-center py-20 bg-card rounded-[2rem] border border-border shadow-sm max-w-lg mx-auto">
        <HiOutlineUser className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
        <h3 className="text-xl font-bold text-foreground mb-2">No Biodata Found</h3>
        <p className="text-muted-foreground font-medium mb-8 px-4">
          Create your biodata to start receiving connection requests and find your perfect match.
        </p>
        <Link
          to="/dashboard/edit-biodata"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg transition-colors"
        >
          Create Biodata Now
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      {/* Top Profile Header */}
      <div className="relative overflow-hidden bg-card border border-border rounded-[32px] p-6 md:p-10 mb-8 shadow-xl">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group">
            <div className="w-44 h-44 rounded-3xl overflow-hidden border-4 border-card shadow-2xl group-hover:border-primary/50 transition-colors duration-500 relative">
              <img
                src={biodata.profileImage}
                className="w-full h-full object-cover"
                alt={biodata.name}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" />
            </div>
            {biodata.isPremium && (
              <div className="absolute -top-3 -right-3 bg-accent text-background p-1.5 rounded-full border-4 border-card shadow-lg">
                <HiBadgeCheck className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight">
                {biodata.name}
              </h1>
              <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-widest">
                {biodata.biodataType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 bg-secondary rounded-lg text-primary">
                  <HiOutlineBriefcase className="w-5 h-5" />
                </div>
                <span className="font-medium">{biodata.occupation}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 bg-secondary rounded-lg text-primary">
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
          <section className="bg-card border border-border rounded-[28px] p-8 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <HiOutlineUser className="text-primary" />
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
          <section className="bg-secondary/50 border border-border rounded-[28px] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-2xl border border-border shadow-inner">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">
                  Email Address
                </p>
                <p className="text-foreground font-medium break-all">
                  {biodata.contactEmail}
                </p>
              </div>
              <div className="p-4 bg-background rounded-2xl border border-border shadow-inner">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">
                  Mobile Number
                </p>
                <p className="text-foreground font-medium">{biodata.mobileNumber}</p>
              </div>
            </div>
          </section>

          {/* Preference Card */}
          <section className="bg-primary/5 border border-primary/20 rounded-[28px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <HiOutlineSparkles className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-6">
              Expectations
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm font-bold">Partner Age</span>
                <span className="text-foreground font-bold">
                  {biodata.expectedPartnerAge} yrs
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm font-bold">Min Height</span>
                <span className="text-foreground font-bold">
                  {biodata.expectedPartnerHeight}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm font-bold">Min Weight</span>
                <span className="text-foreground font-bold">
                  {biodata.expectedPartnerWeight}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Action Area: Premium Request */}
      {!biodata.isPremium && (
        <div className="mt-12 text-center p-8 bg-card border border-border rounded-[32px] shadow-sm">
          <h4 className="text-xl font-serif font-bold text-foreground mb-2">
            Want to stand out?
          </h4>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get the Premium badge and appear at the top of search results to
            find your match 3x faster.
          </p>
          <button
            onClick={handlePremiumRequest}
            disabled={requestSent}
            className="w-full md:w-auto px-12 py-4 bg-accent hover:bg-accent/90 text-background font-black rounded-2xl transition-all shadow-xl shadow-accent/20 disabled:bg-secondary disabled:text-muted-foreground uppercase tracking-widest text-sm"
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
    <div className="mt-1 p-2 bg-secondary rounded-lg text-primary">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-1">
        {label}
      </p>
      <p className="text-foreground font-bold text-base leading-tight">
        {value || 'Not Provided'}
      </p>
    </div>
  </div>
);

export default ViewBiodata;
