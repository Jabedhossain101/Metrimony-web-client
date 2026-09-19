import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    age: true,
    division: true,
    religion: false,
    maritalStatus: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // reset page on filter change
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const divisions = ['Dhaka', 'Chattogram', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 'Sylhet', 'Rajshahi'];
  const religions = ['Sunni', 'Shia', 'Hindu', 'Christian', 'Other'];
  const maritalStatuses = ['Single', 'Divorced', 'Widowed'];

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
          <Filter size={20} className="text-primary" /> Filters
        </h2>
        {Array.from(searchParams.keys()).length > 0 && (
          <button 
            onClick={clearFilters}
            className="text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            Clear All <X size={12} />
          </button>
        )}
      </div>

      {/* --- Biodata Type --- */}
      <FilterSection title="I am looking for" isOpen={expandedSections.type} toggle={() => toggleSection('type')}>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {['female', 'male'].map((type) => {
            const isActive = searchParams.get('type') === type;
            return (
              <button
                key={type}
                onClick={() => updateParam('type', isActive ? '' : type)}
                className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {type === 'female' ? "Bride" : "Groom"}
              </button>
            )
          })}
        </div>
      </FilterSection>

      {/* --- Age Range --- */}
      <FilterSection title="Age (Years)" isOpen={expandedSections.age} toggle={() => toggleSection('age')}>
        <div className="flex items-center gap-3 mt-3">
          <div className="relative flex-1">
            <input
              type="number"
              min="18"
              max="80"
              placeholder="18"
              value={searchParams.get('minAge') || ''}
              onChange={(e) => updateParam('minAge', e.target.value)}
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
            />
            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">Min</span>
          </div>
          <span className="text-muted-foreground">-</span>
          <div className="relative flex-1">
            <input
              type="number"
              min="18"
              max="80"
              placeholder="40"
              value={searchParams.get('maxAge') || ''}
              onChange={(e) => updateParam('maxAge', e.target.value)}
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
            />
            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">Max</span>
          </div>
        </div>
      </FilterSection>

      {/* --- Division --- */}
      <FilterSection title="Division" isOpen={expandedSections.division} toggle={() => toggleSection('division')}>
        <div className="mt-3 space-y-2">
          {divisions.map((div) => {
            const isActive = searchParams.get('division') === div;
            return (
              <label key={div} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-primary border-primary' : 'border-muted-foreground group-hover:border-primary'}`}>
                  {isActive && <CheckIcon />}
                </div>
                <span className={`text-sm ${isActive ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {div}
                </span>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => updateParam('division', isActive ? '' : div)}
                  className="hidden"
                />
              </label>
            )
          })}
        </div>
      </FilterSection>

      {/* --- Religion / Sect --- */}
      <FilterSection title="Religion / Sect" isOpen={expandedSections.religion} toggle={() => toggleSection('religion')}>
        <div className="mt-3 space-y-2">
          {religions.map((rel) => {
            const isActive = searchParams.get('sect') === rel;
            return (
              <label key={rel} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-primary border-primary' : 'border-muted-foreground group-hover:border-primary'}`}>
                  {isActive && <CheckIcon />}
                </div>
                <span className={`text-sm ${isActive ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {rel}
                </span>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => updateParam('sect', isActive ? '' : rel)}
                  className="hidden"
                />
              </label>
            )
          })}
        </div>
      </FilterSection>

      {/* --- Marital Status --- */}
      <FilterSection title="Marital Status" isOpen={expandedSections.maritalStatus} toggle={() => toggleSection('maritalStatus')}>
         <div className="mt-3 space-y-2">
          {maritalStatuses.map((status) => {
            const isActive = searchParams.get('maritalStatus') === status.toLowerCase();
            return (
              <label key={status} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-primary border-primary' : 'border-muted-foreground group-hover:border-primary'}`}>
                  {isActive && <CheckIcon />}
                </div>
                <span className={`text-sm ${isActive ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {status}
                </span>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => updateParam('maritalStatus', isActive ? '' : status.toLowerCase())}
                  className="hidden"
                />
              </label>
            )
          })}
        </div>
      </FilterSection>

    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4 flex justify-between items-center bg-card p-4 rounded-2xl shadow-sm border border-border">
        <h2 className="text-lg font-serif font-bold text-foreground">Match Filters</h2>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-secondary text-foreground rounded-xl flex items-center gap-2 text-sm font-semibold"
        >
          {isMobileOpen ? <X size={18} /> : <Filter size={18} />}
          {isMobileOpen ? 'Close' : 'Filter'}
        </button>
      </div>

      {/* Mobile Sidebar Modal */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed inset-0 z-50 bg-background overflow-y-auto p-6 pt-20"
          >
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 p-2 bg-secondary rounded-full"
            >
              <X size={20} />
            </button>
            <SidebarContent />
            <div className="mt-8 pb-8">
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Search size={18} /> View Results
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full md:w-[320px] shrink-0">
        <div className="bg-card rounded-[2rem] p-6 shadow-sm border border-border sticky top-24">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

// Helper Components
const FilterSection = ({ title, isOpen, toggle, children }) => (
  <div className="border-b border-border pb-4 last:border-0 last:pb-0">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-2 text-left hover:opacity-80 transition-opacity"
    >
      <span className="font-semibold text-sm text-foreground">{title}</span>
      {isOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default FilterSidebar;
