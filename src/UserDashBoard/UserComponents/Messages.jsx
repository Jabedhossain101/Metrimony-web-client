import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Accepted Connections (Conversations)
const mockConversations = [
  {
    id: 1,
    userId: '#19382',
    name: 'Omar Faruk',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    lastMessage: 'Inshallah, I will discuss this with my parents.',
    time: '10:45 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    userId: '#99302',
    name: 'Tariq Islam',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
    lastMessage: 'Yes, that time works perfectly for us.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  }
];

// Mock Chat History for active conversation
const mockMessages = [
  { id: 1, sender: 'other', text: 'As-salamu alaykum. I saw your profile and we have matching expectations.', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Wa alaykum as-salam! Yes, I noticed that too.', time: '10:35 AM' },
  { id: 3, sender: 'other', text: 'Would you be open to arranging a family meeting sometime next week?', time: '10:40 AM' },
  { id: 4, sender: 'other', text: 'Inshallah, I will discuss this with my parents.', time: '10:45 AM' },
];

const Messages = () => {
  const [activeConv, setActiveConv] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConv]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate reply after 1.5s
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'other',
        text: 'Jazakallah khair. I will let you know soon.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
      
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
          {mockConversations.map(conv => (
            <div 
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                activeConv.id === conv.id ? 'bg-primary/5 border border-primary/20' : 'hover:bg-secondary border border-transparent'
              }`}
            >
              <div className="relative shrink-0">
                <img src={conv.image} alt={conv.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`text-sm truncate ${activeConv.id === conv.id ? 'font-bold text-primary' : 'font-semibold text-foreground'}`}>
                    {conv.name}
                  </h4>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{conv.time}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                   <p className={`text-xs truncate ${conv.unread > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                     {conv.lastMessage}
                   </p>
                   {conv.unread > 0 && (
                     <span className="bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shrink-0">
                       {conv.unread}
                     </span>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane - Chat Window */}
      <div className="flex-1 flex flex-col bg-secondary/5 relative">
        
        {/* Chat Header */}
        <div className="h-[76px] px-6 border-b border-border bg-card flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="relative md:hidden mr-2 cursor-pointer">
                {/* Back button for mobile (mocked) */}
                <span className="text-primary font-bold">&larr;</span>
             </div>
             <img src={activeConv.image} alt={activeConv.name} className="w-10 h-10 rounded-full object-cover" />
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
             const isMe = msg.sender === 'me';
             return (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 key={msg.id} 
                 className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
               >
                 <div className={`max-w-[75%] md:max-w-[60%] p-3 rounded-2xl ${
                   isMe 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-card border border-border text-foreground rounded-tl-sm'
                 }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                 </div>
                 <span className="text-[10px] text-muted-foreground mt-1 px-1 font-medium">{msg.time}</span>
               </motion.div>
             )
           })}
           <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-card border-t border-border shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-3">
             <input 
               type="text" 
               value={input}
               onChange={e => setInput(e.target.value)}
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
      </div>
      
    </div>
  );
};

export default Messages;
