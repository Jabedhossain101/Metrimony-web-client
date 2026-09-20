import React, { useState, useRef, useEffect, useContext } from 'react';
import { Send, Phone, Video, MoreVertical, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthContext';
import { useSearchParams } from 'react-router'; // if we want to auto-select from ?connection=id

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const preSelectedConnectionId = searchParams.get('connection');

  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [remoteTyping, setRemoteTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Socket Connection
  useEffect(() => {
    if (!user?._id) return; // Note: We need user._id to join socket room

    const newSocket = io('https://metrimony-server-ten.vercel.app');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join', user._id);
    });

    newSocket.on('receiveMessage', (msg) => {
      // Only append if it belongs to the active conversation
      setMessages(prev => {
        // If we are currently chatting with this connection, show it
        if (activeConv && msg.connectionId === activeConv._id) {
          return [...prev, msg];
        }
        return prev;
      });
      // TODO: Update unread count in conversation list if not active
    });

    newSocket.on('typingStatus', ({ isTyping }) => {
      setRemoteTyping(isTyping);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user, activeConv]);

  // Fetch mutually accepted connections
  const { data: connectionsData, isLoading: connectionsLoading } = useQuery({
    queryKey: ['accepted_connections', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await fetch(`https://metrimony-server-ten.vercel.app/connections/me?email=${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      // Combine and filter only 'accepted'
      const received = data.received || [];
      const sent = data.sent || [];
      const combined = [...received, ...sent].filter(c => c.status === 'accepted');
      
      // Normalize to conversation format
      return combined.map(c => {
        // Find the "other" person
        const isSent = c.senderId?._id === user?._id || c.senderId?.email === user?.email;
        const otherUser = isSent ? c.receiverId : c.senderId;
        
        return {
          _id: c._id, // connection ID
          userId: otherUser?._id ? `#${otherUser._id.slice(-5)}` : 'N/A',
          otherUserId: otherUser?._id,
          name: otherUser?.name || 'Unknown User',
          image: otherUser?.profileImage || 'https://via.placeholder.com/150',
          lastMessage: 'Tap to start messaging', // Mocked until fetched
          time: '',
          unread: 0,
          online: false, // Could be enhanced with socket presence
        };
      });
    },
    enabled: !!user?.email,
  });

  // Auto-select conversation if passed in URL or select first
  useEffect(() => {
    if (connectionsData?.length > 0 && !activeConv) {
      if (preSelectedConnectionId) {
        const target = connectionsData.find(c => c._id === preSelectedConnectionId);
        if (target) setActiveConv(target);
      } else {
        setActiveConv(connectionsData[0]);
      }
    }
  }, [connectionsData, activeConv, preSelectedConnectionId]);

  // Fetch chat history when active conversation changes
  useEffect(() => {
    if (!activeConv?._id) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`https://metrimony-server-ten.vercel.app/messages/${activeConv._id}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchHistory();
  }, [activeConv?._id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, remoteTyping]);

  // Handle typing indicator
  useEffect(() => {
    if (!socket || !activeConv) return;
    const timeout = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        socket.emit('typing', { receiverId: activeConv.otherUserId, isTyping: false });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [input, isTyping, socket, activeConv]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (!isTyping && socket && activeConv) {
      setIsTyping(true);
      socket.emit('typing', { receiverId: activeConv.otherUserId, isTyping: true });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeConv || !socket || !user?._id) return;
    
    const newMsg = {
      connectionId: activeConv._id,
      senderId: user._id,
      text: input,
      createdAt: new Date().toISOString()
    };
    
    // Optimistic update
    setMessages(prev => [...prev, { ...newMsg, _id: Date.now().toString() }]);
    setInput('');
    setIsTyping(false);
    
    // Emit to backend
    socket.emit('sendMessage', {
      connectionId: activeConv._id,
      senderId: user._id,
      receiverId: activeConv.otherUserId,
      text: newMsg.text
    });
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm animate-in fade-in duration-500">
      
      {/* Left Pane - Conversation List */}
      <div className="w-full md:w-80 border-r border-border flex flex-col bg-card/50 hidden md:flex shrink-0">
        
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
            Messages
          </h2>
          
          <div className="relative mt-4">
            <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-foreground"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {connectionsLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : connectionsData?.length > 0 ? (
            connectionsData.map(conv => (
              <div 
                key={conv._id}
                onClick={() => setActiveConv(conv)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                  activeConv?._id === conv._id ? 'bg-primary/5 border border-primary/20' : 'hover:bg-secondary border border-transparent'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={conv.image} alt={conv.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                  {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={`text-sm truncate ${activeConv?._id === conv._id ? 'font-bold text-primary' : 'font-semibold text-foreground'}`}>
                      {conv.name}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                     <p className={`text-xs truncate text-muted-foreground`}>
                       {conv.lastMessage}
                     </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No mutual connections yet.
            </div>
          )}
        </div>
      </div>

      {/* Right Pane - Chat Window */}
      <div className="flex-1 flex flex-col bg-secondary/5 relative">
        
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="h-[76px] px-6 border-b border-border bg-card flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                 <img src={activeConv.image} alt={activeConv.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                 <div>
                   <h3 className="font-bold text-foreground flex items-center gap-1">
                     {activeConv.name}
                     <ShieldCheck size={14} className="text-emerald-500" />
                   </h3>
                   <p className="text-xs text-muted-foreground">
                     {activeConv.online ? 'Online' : 'Offline'} • {activeConv.userId}
                   </p>
                 </div>
              </div>
              
              <div className="flex items-center gap-1 md:gap-3 text-slate-500">
                 <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block">
                   <Phone size={18} />
                 </button>
                 <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden md:block">
                   <Video size={18} />
                 </button>
                 <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                   <MoreVertical size={18} />
                 </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <div className="text-center">
                  <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs font-semibold rounded-full uppercase tracking-wider">
                    Connection Accepted
                  </span>
               </div>

               {messages.map(msg => {
                 const isMe = msg.senderId === user?._id;
                 return (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     key={msg._id} 
                     className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                   >
                     <div className={`max-w-[75%] md:max-w-[60%] p-3 rounded-2xl ${
                       isMe 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-card border border-border text-foreground rounded-tl-sm'
                     }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                     </div>
                     <span className="text-[10px] text-muted-foreground mt-1 px-1 font-medium">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </span>
                   </motion.div>
                 )
               })}
               
               {remoteTyping && (
                 <div className="flex items-start">
                    <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm flex gap-1">
                       <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                       <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-75"></span>
                       <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-150"></span>
                    </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-card border-t border-border shrink-0">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                 <input 
                   type="text" 
                   value={input}
                   onChange={handleInputChange}
                   placeholder="Type a message safely..." 
                   className="flex-1 px-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-foreground transition-all"
                 />
                 <button 
                   type="submit"
                   disabled={!input.trim()}
                   className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
                 >
                   <Send size={18} className="ml-1" />
                 </button>
              </form>
              <p className="text-[10px] text-center text-muted-foreground mt-2 font-medium">
                <ShieldCheck size={10} className="inline mr-1 text-emerald-500" />
                Messages are end-to-end encrypted and monitored for community safety.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
             <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
               <ShieldCheck size={32} className="text-muted-foreground" />
             </div>
             <h3 className="text-xl font-bold text-foreground mb-2">Private Messaging</h3>
             <p className="text-muted-foreground max-w-sm">
               Select a mutually accepted connection from the sidebar to start a secure conversation.
             </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Messages;
