import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, UserCheck, UserX, Clock, Check, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router'; // for 'Message' link if needed

const Connections = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('received');

  // Fetch connections using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['connections', user?.email],
    queryFn: async () => {
      if (!user?.email) return { received: [], sent: [] };
      const res = await fetch(`https://metrimony-server-ten.vercel.app/connections/me?email=${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch connections');
      return res.json();
    },
    enabled: !!user?.email,
  });

  // Mutation for updating status
  const mutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await fetch(`https://metrimony-server-ten.vercel.app/connections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: (updatedConnection, variables) => {
      toast.success(`Connection request ${variables.newStatus}!`);
      // Invalidate and refetch
      queryClient.invalidateQueries(['connections', user?.email]);
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    }
  });

  const handleAction = (id, newStatus) => {
    mutation.mutate({ id, newStatus });
  };

  // Safe fallback if data is missing
  const receivedList = data?.received || [];
  const sentList = data?.sent || [];

  // Re-map backend response to UI-friendly structure
  const formattedReceived = receivedList.map(c => ({
    ...c,
    type: 'received',
    // fallback if populated sender is missing
    name: c.senderId?.name || 'Unknown User',
    image: c.senderId?.profileImage || 'https://via.placeholder.com/150',
    biodataId: c.senderId?._id ? `#${c.senderId._id.slice(-5)}` : 'N/A',
    age: c.senderId?.age || 'N/A',
    location: c.senderId?.presentDivision || 'N/A',
    date: new Date(c.createdAt).toLocaleDateString(),
  }));

  const formattedSent = sentList.map(c => ({
    ...c,
    type: 'sent',
    name: c.receiverId?.name || 'Unknown User',
    image: c.receiverId?.profileImage || 'https://via.placeholder.com/150',
    biodataId: c.receiverId?._id ? `#${c.receiverId._id.slice(-5)}` : 'N/A',
    age: c.receiverId?.age || 'N/A',
    location: c.receiverId?.presentDivision || 'N/A',
    date: new Date(c.createdAt).toLocaleDateString(),
  }));

  const allConnections = [...formattedReceived, ...formattedSent];
  let filteredConnections = allConnections.filter(conn => conn.type === activeTab);

  // My Connections tab (mutually accepted)
  if (activeTab === 'my_connections') {
    filteredConnections = allConnections.filter(conn => conn.status === 'accepted');
  }

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
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Connections</h2>
        <p className="text-muted-foreground mt-2">Manage your sent and received interest requests.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary/50 p-1.5 rounded-2xl w-full max-w-xl mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'received' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Received Interests
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'sent' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sent Interests
        </button>
        <button
          onClick={() => setActiveTab('my_connections')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
            activeTab === 'my_connections' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Connections
        </button>
      </div>

      {/* Connection List */}
      <div className="flex-1 overflow-y-auto pr-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
             <p className="mt-4 text-muted-foreground">Loading connections...</p>
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-rose-500 font-medium">Failed to load connections.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredConnections.length > 0 ? (
                filteredConnections.map(conn => (
                  <motion.div
                    key={conn._id}
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
                        <h4 className="text-lg font-bold text-foreground truncate max-w-[150px]">{conn.name}</h4>
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                          {conn.biodataId} <span className="px-1 text-muted-foreground/50">•</span> {conn.age} yrs <span className="px-1 text-muted-foreground/50">•</span> {conn.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground font-medium mb-4 flex items-center gap-1.5">
                      <Clock size={12} /> {conn.type === 'received' ? 'Received' : 'Sent'} on {conn.date}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      {activeTab === 'received' && conn.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleAction(conn._id, 'accepted')}
                            disabled={mutation.isPending}
                            className="flex-1 bg-primary text-primary-foreground py-2 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleAction(conn._id, 'declined')}
                            disabled={mutation.isPending}
                            className="flex-1 bg-secondary text-foreground py-2 rounded-xl font-semibold text-sm hover:bg-secondary/80 transition-colors disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      
                      {activeTab === 'sent' && conn.status === 'pending' && (
                        <button 
                          onClick={() => handleAction(conn._id, 'cancelled')}
                          disabled={mutation.isPending}
                          className="w-full bg-secondary text-foreground py-2 rounded-xl font-semibold text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors border border-transparent hover:border-rose-100 disabled:opacity-50"
                        >
                          Cancel Request
                        </button>
                      )}

                      {/* My Connections or Accepted items show Message button */}
                      {conn.status === 'accepted' && (
                        <div className="w-full flex gap-2">
                           <Link 
                             to={`/dashboard/messages?connection=${conn._id}`}
                             className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 py-2 rounded-xl font-semibold text-sm flex justify-center items-center gap-2 transition-colors border border-emerald-100"
                           >
                             <MessageCircle size={16} /> Message
                           </Link>
                           <button className="flex-1 bg-secondary/50 text-foreground py-2 rounded-xl font-semibold text-sm border border-border flex justify-center items-center gap-2 pointer-events-none">
                             <ShieldCheck size={16} /> Verified
                           </button>
                        </div>
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
                  <h3 className="text-xl font-bold text-foreground mb-2">No {activeTab.replace('_', ' ')} found</h3>
                  <p className="text-muted-foreground max-w-sm">
                    {activeTab === 'my_connections' 
                      ? 'When you and another member accept interests, they will appear here.'
                      : `When you ${activeTab === 'received' ? 'receive' : 'send'} connection requests, they will appear here.`}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
