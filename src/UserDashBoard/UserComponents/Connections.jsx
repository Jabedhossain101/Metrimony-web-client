import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserCheck, UserX, Clock, Check, X, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Mock data for demonstration
const mockConnections = [
  {
    id: 1,
    type: 'received',
    status: 'pending',
    biodataId: '#28475',
    name: 'Aisha Rahman',
    age: 24,
    location: 'Dhaka',
    date: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 2,
    type: 'sent',
    status: 'accepted',
    biodataId: '#19382',
    name: 'Omar Faruk',
    age: 28,
    location: 'Chattogram',
    date: '1 day ago',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 3,
    type: 'sent',
    status: 'pending',
    biodataId: '#58210',
    name: 'Fatima Khan',
    age: 25,
    location: 'Sylhet',
    date: '3 days ago',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 4,
    type: 'received',
    status: 'accepted',
    biodataId: '#99302',
    name: 'Tariq Islam',
    age: 30,
    location: 'Khulna',
    date: '1 week ago',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

const Connections = () => {
  const [activeTab, setActiveTab] = useState('received');
  const [connections, setConnections] = useState(mockConnections);

  const filteredConnections = connections.filter(conn => conn.type === activeTab);

  const handleAction = (id, newStatus) => {
    setConnections(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    toast.success(`Connection request ${newStatus}!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case 'accepted':
        return <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check size={12} /> Accepted</span>;
      case 'declined':
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><X size={12} /> {status}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Connections</h2>
        <p className="text-muted-foreground mt-2">Manage your sent and received interest requests.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary/50 p-1.5 rounded-2xl w-full max-w-md mb-8">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'received' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Received Interests
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'sent' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sent Interests
        </button>
      </div>

      {/* Connection List */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredConnections.length > 0 ? (
              filteredConnections.map(conn => (
                <motion.div
                  key={conn.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card border border-border rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-5 right-5">
                    {getStatusBadge(conn.status)}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-5">
                    <img src={conn.image} alt={conn.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-secondary" />
                    <div>
                      <h4 className="text-lg font-bold text-foreground truncate">{conn.name}</h4>
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                        {conn.biodataId} <span className="px-1 text-slate-300">•</span> {conn.age} yrs <span className="px-1 text-slate-300">•</span> {conn.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1.5">
                    <Clock size={12} /> {conn.type === 'received' ? 'Received' : 'Sent'} {conn.date}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {activeTab === 'received' && conn.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleAction(conn.id, 'accepted')}
                          className="flex-1 bg-primary text-primary-foreground py-2 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleAction(conn.id, 'declined')}
                          className="flex-1 bg-secondary text-foreground py-2 rounded-xl font-semibold text-sm hover:bg-secondary/80 transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'sent' && conn.status === 'pending' && (
                      <button 
                        onClick={() => handleAction(conn.id, 'cancelled')}
                        className="w-full bg-secondary text-foreground py-2 rounded-xl font-semibold text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors border border-transparent hover:border-rose-100"
                      >
                        Cancel Request
                      </button>
                    )}

                    {conn.status === 'accepted' && (
                      <button className="w-full bg-emerald-50 text-emerald-600 py-2 rounded-xl font-semibold text-sm border border-emerald-100 flex justify-center items-center gap-2 pointer-events-none">
                        <ShieldCheck size={16} /> Contact Info Unlocked
                      </button>
                    )}
                    
                    {(conn.status === 'declined' || conn.status === 'cancelled') && (
                      <button className="w-full bg-secondary/50 text-muted-foreground py-2 rounded-xl font-semibold text-sm cursor-not-allowed">
                        Closed
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <UserPlus size={40} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No {activeTab} interests</h3>
                <p className="text-muted-foreground max-w-sm">
                  When you {activeTab === 'received' ? 'receive' : 'send'} connection requests, they will appear here.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Connections;
