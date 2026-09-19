import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Briefcase, User, Heart, ShieldCheck, Mail, Phone, Lock, Calendar, BookOpen, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

const BiodataModal = ({ isOpen, onClose, biodata }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [contactRequested, setContactRequested] = useState(false);

  if (!biodata) return null;

  const handleRequestContact = () => {
    setContactRequested(true);
    toast.success("Contact request sent! The user will be notified.");
  };

  const isBlurred = biodata.privacySetting === 'blurred';

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
        activeTab === id 
          ? 'border-primary text-primary' 
          : 'border-transparent text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon size={16} /> <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground w-1/3">{label}</span>
      <span className="text-sm font-semibold text-foreground w-2/3">{value || 'N/A'}</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[101] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[800px] max-h-[90vh] bg-card md:rounded-[2rem] rounded-t-[2rem] shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header / Hero */}
            <div className="relative h-48 sm:h-64 bg-secondary/50 flex-shrink-0">
               {/* Cover Image/Gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
               
               <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground hover:bg-background transition-colors z-10"
               >
                 <X size={20} />
               </button>

               <div className="absolute -bottom-12 sm:-bottom-16 left-6 sm:left-10 flex items-end gap-4 sm:gap-6">
                 <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-4 border-card bg-secondary overflow-hidden shadow-lg">
                    {biodata.profileImage ? (
                      <img 
                        src={biodata.profileImage} 
                        alt={biodata.name} 
                        className={`w-full h-full object-cover ${isBlurred ? 'blur-md grayscale' : ''}`} 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary">
                        <User size={40} className="text-muted-foreground" />
                      </div>
                    )}
                 </div>
                 <div className="pb-2 sm:pb-4">
                    <div className="flex items-center gap-2">
                       <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground truncate max-w-[200px] sm:max-w-md">
                         {biodata.name}
                       </h2>
                       <ShieldCheck className="text-emerald-500 shrink-0" size={24} title="Verified" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-1 flex items-center gap-2">
                       <MapPin size={14} /> {biodata.permanentDivision || 'Location Unknown'}
                    </p>
                 </div>
               </div>
            </div>

            {/* Spacer for overlapping avatar */}
            <div className="h-14 sm:h-20 shrink-0"></div>

            {/* Action Bar */}
            <div className="px-6 sm:px-10 py-4 border-b border-border flex flex-wrap gap-3 items-center justify-between bg-card shrink-0">
               <div className="flex gap-2 w-full sm:w-auto">
                 <button className="flex-1 sm:flex-none px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2">
                    <Heart size={16} /> Send Interest
                 </button>
                 {!contactRequested ? (
                   <button 
                     onClick={handleRequestContact}
                     className="flex-1 sm:flex-none px-6 py-2.5 bg-secondary text-foreground rounded-full font-semibold text-sm hover:bg-secondary/80 transition-colors shadow-sm flex items-center justify-center gap-2"
                   >
                      <Lock size={16} /> Request Contact
                   </button>
                 ) : (
                   <div className="px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-full font-semibold text-sm flex items-center justify-center gap-2 border border-emerald-100">
                      <ShieldCheck size={16} /> Request Pending
                   </div>
                 )}
               </div>
               
               {/* Safe Contact Display */}
               {contactRequested && (
                 <div className="text-xs text-muted-foreground flex items-center gap-1.5 w-full sm:w-auto mt-2 sm:mt-0">
                   <Phone size={12} /> Contact info hidden until accepted.
                 </div>
               )}
            </div>

            {/* Tabs */}
            <div className="flex px-6 sm:px-10 border-b border-border bg-card overflow-x-auto no-scrollbar shrink-0">
              <TabButton id="basic" label="Basic Info" icon={User} />
              <TabButton id="family" label="Family Details" icon={Users} />
              <TabButton id="education" label="Education & Career" icon={BookOpen} />
              <TabButton id="lifestyle" label="Lifestyle & Expectations" icon={Heart} />
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:px-10 flex-1 overflow-y-auto bg-secondary/10">
               {activeTab === 'basic' && (
                 <div className="space-y-1">
                   <DetailRow label="Biodata Type" value={biodata.biodataType} />
                   <DetailRow label="Age" value={biodata.age ? `${biodata.age} Years` : null} />
                   <DetailRow label="Date of Birth" value={biodata.dob} />
                   <DetailRow label="Marital Status" value={biodata.maritalStatus} />
                   <DetailRow label="Religion / Sect" value={biodata.sect} />
                   <DetailRow label="Practice Level" value={biodata.practiceLevel} />
                   <DetailRow label="Permanent Division" value={biodata.permanentDivision} />
                   <DetailRow label="Present Division" value={biodata.presentDivision} />
                 </div>
               )}

               {activeTab === 'family' && (
                 <div className="space-y-1">
                   <DetailRow label="Father's Name" value={biodata.fathersName} />
                   <DetailRow label="Mother's Name" value={biodata.mothersName} />
                   <DetailRow label="Family Type" value={biodata.familyType} />
                   <DetailRow label="Family Values" value={biodata.familyValues} />
                 </div>
               )}

               {activeTab === 'education' && (
                 <div className="space-y-1">
                   <DetailRow label="Highest Education" value={biodata.educationLevel} />
                   <DetailRow label="Occupation" value={biodata.occupation} />
                   <DetailRow label="Income Range" value={biodata.incomeRange} />
                 </div>
               )}

               {activeTab === 'lifestyle' && (
                 <div className="space-y-6">
                   <div>
                     <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Physical Attributes</h4>
                     <div className="bg-card p-4 rounded-2xl border border-border space-y-1">
                       <DetailRow label="Height" value={biodata.height} />
                       <DetailRow label="Weight" value={biodata.weight} />
                       <DetailRow label="Skin Color" value={biodata.race} />
                       <DetailRow label="Dietary Habits" value={biodata.diet} />
                     </div>
                   </div>
                   
                   <div>
                     <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Partner Expectations</h4>
                     <div className="bg-card p-4 rounded-2xl border border-border space-y-1">
                       <DetailRow label="Expected Age" value={biodata.expectedPartnerAge} />
                       <DetailRow label="Expected Height" value={biodata.expectedPartnerHeight} />
                       <DetailRow label="Expected Weight" value={biodata.expectedPartnerWeight} />
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BiodataModal;
