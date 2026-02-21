import { AuthContext } from '../Contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import {
  User,
  Mail,
  MapPin,
  Edit3,
  Settings,
  Shield,
  Crown,
  Heart,
  Eye,
  Zap,
  LogOut,
  CheckCircle2,
  LogIn,
} from 'lucide-react';
import { useContext, useMemo } from 'react';

const ProfileCard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- 1. HANDLE LOGOUT FUNCTIONALITY ---
  const handleLogout = async () => {
    try {
      await logOut();
      // Optional: Navigate to home after logout
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };


  const userData = user?.userData || user || {};
  const { displayName, email, photoURL, role, metadata } = userData;

  // --- 3. CALCULATE PROFILE STRENGTH DYNAMICALLY ---
  const profileStrength = useMemo(() => {
    if (!user) return 0;
    let score = 0;
    if (displayName) score += 25;
    if (email) score += 25;
    if (photoURL) score += 25;
    if (role) score += 10;
    if (metadata?.creationTime) score += 15;
    return score;
  }, [user, displayName, email, photoURL, role, metadata]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // --- 4. GUEST VIEW (If not logged in) ---
  if (!user) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-200 to-slate-300 group-hover:from-rose-400 group-hover:to-rose-600 transition-all duration-500" />

        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 group-hover:scale-110 transition-transform duration-300">
          <User size={32} />
        </div>

        <h3 className="text-2xl font-serif text-slate-900 mb-3">
          Welcome Guest
        </h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Unlock exclusive matches and premium features by logging into your
          account.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <LogIn size={18} /> Login / Register
        </button>
      </motion.div>
    );
  }

  // --- 5. LOGGED IN VIEW ---
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="profile-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100/80 ring-1 ring-slate-50"
      >
        {/* HEADER BACKGROUND */}
        <div className="h-32 bg-gradient-to-br from-slate-900 via-slate-800 to-rose-900 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-500/20 rounded-full blur-xl" />

          {/* Settings Button (Navigates to settings) */}
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
          >
            <Settings size={18} />
          </button>
        </div>

        <div className="px-6 relative">
          {/* AVATAR SECTION */}
          <div className="flex justify-between items-end -mt-12 mb-5">
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg">
                <img
                  src={
                    photoURL ||
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                  }
                  alt={displayName}
                  className="w-full h-full rounded-full object-cover border border-slate-100"
                />
              </div>
              {/* Online Indicator */}
              <div
                className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"
                title="Online"
              />
            </motion.div>

            {/* Edit Button */}
            <button
              onClick={() => navigate('/dashboard/edit-biodata')}
              className="mb-2 px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-full hover:bg-rose-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
            >
              <Edit3 size={14} /> <span className="hidden sm:inline">Edit</span>
            </button>
          </div>

          {/* USER DETAILS */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-serif font-bold text-slate-900 truncate">
                {displayName || 'New Member'}
              </h3>
              {role === 'admin' ? (
                <Shield
                  size={18}
                  className="text-blue-500 fill-blue-50 shrink-0"
                />
              ) : (
                <CheckCircle2 size={18} className="text-rose-500 shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <Mail size={14} className="shrink-0" />
              <span className="truncate max-w-[200px]">{email}</span>
            </div>

            {/* Simulated Location (Replace with user.location if available) */}
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <MapPin size={12} className="shrink-0" />
              <span>{userData?.location || 'Location Not Set'}</span>
            </div>
          </motion.div>

          {/* DYNAMIC STATS (If you have this data in DB, map it here. Otherwise keep placeholders) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            <StatBox
              icon={Heart}
              value={userData?.likes || '0'}
              label="Likes"
              color="text-rose-500"
            />
            <StatBox
              icon={Eye}
              value={userData?.views || '0'}
              label="Views"
              color="text-blue-500"
            />
            <StatBox
              icon={Zap}
              value={userData?.matchRate || 'N/A'}
              label="Match"
              color="text-amber-500"
            />
          </motion.div>

          {/* MEMBERSHIP CARD */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-200 mb-8 relative overflow-hidden"
          >
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1">
                  Membership Status
                </p>
                <h4 className="text-lg font-serif font-bold flex items-center gap-2 capitalize">
                  {role || 'Free Plan'}{' '}
                  <Crown
                    size={16}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </h4>
              </div>
              <button
                onClick={() => navigate('/pricing')}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-xs font-semibold hover:bg-white hover:text-slate-900 transition-all"
              >
                Upgrade
              </button>
            </div>
            {/* Decorative Overlay */}
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-rose-600/20 to-transparent" />
          </motion.div>

          {/* PROFILE COMPLETION BAR */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Profile Strength
              </span>
              <span
                className={`text-xs font-bold ${profileStrength === 100 ? 'text-emerald-500' : 'text-rose-600'}`}
              >
                {profileStrength}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profileStrength}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full ${profileStrength === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-rose-400 to-rose-600'}`}
              />
            </div>
            {profileStrength < 100 && (
              <p className="text-[10px] text-slate-400 mt-2">
                Add more details to increase your visibility.
              </p>
            )}
          </motion.div>
        </div>

        {/* LOGOUT ACTION */}
        <div className="bg-slate-50 p-2 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-slate-500 hover:bg-white hover:text-rose-600 hover:shadow-sm text-sm font-medium transition-all py-3 rounded-xl"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Sub-component for clean code
const StatBox = ({ icon: Icon, value, label, color }) => (
  <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100 hover:border-slate-200 transition-colors cursor-default group">
    <div
      className={`${color} flex justify-center mb-1 transition-transform group-hover:scale-110`}
    >
      <Icon size={18} />
    </div>
    <p className="text-lg font-bold text-slate-800">{value}</p>
    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
      {label}
    </p>
  </div>
);

export default ProfileCard;
