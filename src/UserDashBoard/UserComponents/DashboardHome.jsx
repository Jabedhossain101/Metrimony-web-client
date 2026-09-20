import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, ShieldCheck, Star, Activity, ArrowUpRight } from 'lucide-react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { label: 'Profile Views', value: '142', icon: <Activity size={20} />, trend: '+12% this week', color: 'text-blue-500' },
    { label: 'Matches Found', value: '24', icon: <Heart size={20} />, trend: '3 new today', color: 'text-primary' },
    { label: 'Pending Requests', value: '5', icon: <Users size={20} />, trend: 'Needs attention', color: 'text-accent' },
    { label: 'Shortlisted', value: '12', icon: <Star size={20} />, trend: 'Saved profiles', color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Overview
          </h2>
          <p className="text-muted-foreground mt-2">Track your matchmaking progress and recent activities.</p>
        </div>
        <Link to="/dashboard/edit-biodata" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-md hover:shadow-primary/20 flex items-center gap-2 w-fit">
          <ShieldCheck size={16} /> Complete Profile
        </Link>
      </div>

      {/* Profile Completion Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset="70" 
              className="text-primary drop-shadow-md" 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-serif font-bold text-foreground">75%</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h3 className="text-xl font-bold text-foreground mb-2">Profile almost complete!</h3>
          <p className="text-muted-foreground text-sm max-w-lg mb-6">Users with complete profiles receive up to 3x more connection requests. Add your family details to reach 100%.</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1">
              <ShieldCheck size={14} /> Basic Details
            </span>
            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1">
              <ShieldCheck size={14} /> Photos
            </span>
            <span className="px-4 py-2 bg-secondary text-muted-foreground rounded-xl text-xs font-bold border border-transparent">
              Family Details (Pending)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-secondary ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h4 className="text-3xl font-serif font-bold text-foreground mb-1">{stat.value}</h4>
            <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mt-4">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-8 rounded-[2rem] shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-6">Recent Matches</h3>
          <div className="space-y-4">
             {/* Mock Match 1 */}
             <div className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-border hover:bg-secondary/50 transition-colors cursor-pointer">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100" className="w-12 h-12 rounded-full object-cover border border-border" alt="" />
               <div className="flex-1">
                 <h4 className="font-bold text-foreground">Aisha Rahman</h4>
                 <p className="text-xs text-muted-foreground">98% Match • Dhaka</p>
               </div>
               <button className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-colors">
                 <Heart size={16} />
               </button>
             </div>
             {/* Mock Match 2 */}
             <div className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-border hover:bg-secondary/50 transition-colors cursor-pointer">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" className="w-12 h-12 rounded-full object-cover border border-border" alt="" />
               <div className="flex-1">
                 <h4 className="font-bold text-foreground">Fatima Khan</h4>
                 <p className="text-xs text-muted-foreground">92% Match • Sylhet</p>
               </div>
               <button className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-colors">
                 <Heart size={16} />
               </button>
             </div>
          </div>
          <Link to="/biodata" className="block text-center text-xs font-bold text-primary uppercase tracking-widest mt-6 hover:text-primary/80">View All Matches</Link>
        </div>

        <div className="bg-primary text-primary-foreground rounded-[2rem] p-8 shadow-xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
             <Star size={200} fill="currentColor" />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Upgrade to Premium</h3>
          <p className="text-primary-foreground/80 mb-8 relative z-10">Unlock unlimited messaging, advanced matchmaking filters, and verified trust badges to find your soulmate faster.</p>
          <button className="bg-background text-foreground px-8 py-3.5 rounded-full font-bold w-fit hover:scale-105 transition-transform shadow-lg relative z-10">
            View Membership Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
