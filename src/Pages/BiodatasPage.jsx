import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import FilterSidebar from '../Components/FilterSidebar';
import BiodataCard from '../Components/BiodataCard';
import BiodataSkeleton from '../Components/BiodataSkeleton';
import BiodataModal from '../Components/BiodataModal';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, ChevronLeft, ChevronRight } from 'lucide-react';

const BiodatasPage = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Modal State
  const [selectedBiodata, setSelectedBiodata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://metrimony-server-ten.vercel.app/biodatas')
      .then(res => res.json())
      .then(data => {
        setBiodatas(data);
        // Simulate a tiny delay to show off the skeleton loaders gracefully
        setTimeout(() => setLoading(false), 800);
      })
      .catch(err => {
        console.error("Failed to fetch biodatas", err);
        setLoading(false);
      });
  }, []);

  // Filter Logic using URL Params
  const typeFilter = searchParams.get('type');
  const minAgeFilter = searchParams.get('minAge');
  const maxAgeFilter = searchParams.get('maxAge');
  const divisionFilter = searchParams.get('division');
  const sectFilter = searchParams.get('sect');
  const maritalStatusFilter = searchParams.get('maritalStatus');
  
  const filteredData = biodatas.filter(item => {
    const ageValid =
      (!minAgeFilter || item.age >= parseInt(minAgeFilter)) &&
      (!maxAgeFilter || item.age <= parseInt(maxAgeFilter));
    const typeValid = !typeFilter || item.biodataType === typeFilter;
    const divisionValid = !divisionFilter || item.permanentDivision === divisionFilter;
    
    // Fallbacks if data doesn't exist on older records
    const sectValid = !sectFilter || (item.sect && item.sect === sectFilter);
    const maritalStatusValid = !maritalStatusFilter || (item.maritalStatus && item.maritalStatus.toLowerCase() === maritalStatusFilter);

    return ageValid && typeValid && divisionValid && sectValid && maritalStatusValid;
  });

  // Pagination
  const itemsPerPage = 9; // 3x3 grid
  const currentPage = parseInt(searchParams.get('page') || '1');
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', page.toString());
      setSearchParams(newParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCardClick = (biodata) => {
    setSelectedBiodata(biodata);
    setIsModalOpen(true);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-center gap-2 mt-12 mb-8">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-border rounded-xl disabled:opacity-50 hover:bg-secondary text-foreground transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-transparent text-foreground hover:bg-secondary border border-transparent hover:border-border'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-border rounded-xl disabled:opacity-50 hover:bg-secondary text-foreground transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-secondary/10 min-h-screen pb-16">
      {/* Search Header Banner */}
      <div className="bg-card border-b border-border pt-12 pb-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Find Your Perfect Match</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through thousands of verified profiles. Use the advanced filters to narrow down your search and find someone who shares your values and lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <FilterSidebar />
          
          <div className="flex-1 w-full min-w-0">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-foreground">
                {loading ? 'Searching...' : `${filteredData.length} Matches Found`}
              </h3>
            </div>

            {/* Grid Area */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BiodataSkeleton key={i} />
                ))}
              </div>
            ) : currentItems.length > 0 ? (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map(biodata => (
                    <BiodataCard 
                      key={biodata._id} 
                      biodata={biodata} 
                      onClick={() => handleCardClick(biodata)} 
                    />
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <div className="bg-card rounded-[2rem] border border-border p-12 text-center flex flex-col items-center shadow-sm">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-muted-foreground mb-6">
                   <SearchX size={32} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">No Matches Found</h4>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We couldn't find any profiles matching your current filters. Try adjusting your age range, division, or other preferences.
                </p>
                <button 
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="mt-6 px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {!loading && renderPagination()}
          </div>
        </div>
      </div>

      {/* Modal */}
      <BiodataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        biodata={selectedBiodata} 
      />
    </div>
  );
};

export default BiodatasPage;
