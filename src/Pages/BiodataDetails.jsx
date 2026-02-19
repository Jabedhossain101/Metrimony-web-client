import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Briefcase,
  User,
  Calendar,
  Ruler,
  Weight,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Star,
} from 'lucide-react';
import BiodataCard from '../Components/BiodataCard'; // Reuse your styled card

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await fetch(
          `https://metrimony-server-ten.vercel.app/biodatas/${id}`,
        );
        const data = await res.json();
        setBiodata(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching biodata:', error);
        setLoading(false);
      }
    };
    if (id) fetchBiodata();
  }, [id]);

  useEffect(() => {
    const fetchSimilarBiodatas = async () => {
      try {
        const res = await fetch(
          `https://metrimony-server-ten.vercel.app/biodatas?type=${biodata.biodataType}`,
        );
        const data = await res.json();
        const filtered = data.filter(b => b._id !== biodata._id);
        setSimilarBiodatas(filtered.slice(0, 3));
      } catch (error) {
        console.error('Error fetching similar biodatas:', error);
      }
    };
    if (biodata?.biodataType) fetchSimilarBiodatas();
  }, [biodata]);

  const isPremium = user?.role === 'premium';

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-600"></div>
      </div>
    );

  if (!biodata)
    return (
      <div className="text-center py-20 text-rose-600 font-serif">
        Biodata not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {/* --- BACK BUTTON --- */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium uppercase tracking-widest">
            Back to Search
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT: PROFILE IMAGE & QUICK INFO (Span 4) --- */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-[3rem] shadow-xl shadow-rose-100/20 border border-slate-50"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                <img
                  src={biodata.profileImage}
                  className="w-full h-full object-cover"
                  alt={biodata.name}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {biodata.biodataType}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center pb-4">
                <h1 className="text-3xl font-serif font-medium text-slate-900">
                  {biodata.name}
                </h1>
                <p className="text-slate-400 font-light flex items-center justify-center gap-2 mt-2">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  ID: {biodata._id.slice(-6)}
                </p>
              </div>
            </motion.div>

            {/* --- ACTION BUTTONS --- */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  /* handleAddToFavourites function logic */
                }}
                className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
              >
                <Heart size={18} fill="currentColor" /> Add to Favourites
              </button>

              {!isPremium && (
                <button
                  onClick={() => navigate(`/checkout/${biodata._id}`)}
                  className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                >
                  <Lock size={18} /> Request Contact Info
                </button>
              )}
            </div>
          </div>

          {/* --- RIGHT: DETAILED INFO (Span 8) --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Contact Details (Premium Section) */}
            {isPremium ? (
              <div className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-[2rem] flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">
                      Email Address
                    </p>
                    <p className="text-slate-800 font-medium">
                      {biodata.contactEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">
                      Mobile Number
                    </p>
                    <p className="text-slate-800 font-medium">
                      {biodata.mobileNumber}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-[2rem] text-center">
                <p className="text-rose-600 font-medium text-sm">
                  Contact information is hidden. Request access to view details.
                </p>
              </div>
            )}

            {/* Information Grid */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm space-y-10">
              <section>
                <h3 className="text-xl font-serif text-slate-900 mb-6 flex items-center gap-2">
                  <User className="text-rose-500" size={20} /> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <DetailItem label="Age" value={`${biodata.age} Years`} />
                  <DetailItem label="Date of Birth" value={biodata.dob} />
                  <DetailItem label="Height" value={biodata.height} />
                  <DetailItem label="Weight" value={biodata.weight} />
                  <DetailItem label="Occupation" value={biodata.occupation} />
                  <DetailItem label="Race/Skin Color" value={biodata.race} />
                </div>
              </section>

              <hr className="border-slate-50" />

              <section>
                <h3 className="text-xl font-serif text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin className="text-rose-500" size={20} /> Family &
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <DetailItem
                    label="Father's Name"
                    value={biodata.fathersName}
                  />
                  <DetailItem
                    label="Mother's Name"
                    value={biodata.mothersName}
                  />
                  <DetailItem
                    label="Permanent Division"
                    value={biodata.permanentDivision}
                  />
                  <DetailItem
                    label="Present Division"
                    value={biodata.presentDivision}
                  />
                </div>
              </section>

              <hr className="border-slate-50" />

              <section>
                <h3 className="text-xl font-serif text-slate-900 mb-6 flex items-center gap-2">
                  <Heart className="text-rose-500" size={20} /> Partner
                  Expectations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <DetailItem
                    label="Expected Age"
                    value={biodata.expectedPartnerAge}
                  />
                  <DetailItem
                    label="Expected Height"
                    value={biodata.expectedPartnerHeight}
                  />
                  <DetailItem
                    label="Expected Weight"
                    value={biodata.expectedPartnerWeight}
                  />
                </div>
              </section>
            </div>
          </motion.div>
        </div>

        {/* --- SIMILAR BIODATAS --- */}
        <div className="mt-24">
          <div className="flex flex-col items-center mb-12">
            <span className="text-rose-500 text-[10px] font-bold uppercase tracking-[4px] mb-2">
              Curated Matches
            </span>
            <h3 className="text-4xl font-serif text-slate-900">
              Similar Profiles
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarBiodatas.map(sb => (
              <BiodataCard key={sb._id} biodata={sb} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Data Rows
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-slate-700 font-light">{value || 'N/A'}</span>
  </div>
);

export default BiodataDetails;
