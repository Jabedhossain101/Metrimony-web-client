import React from 'react';
import { motion } from 'framer-motion';

const BiodataSkeleton = () => {
  return (
    <div className="bg-card rounded-[2.5rem] p-5 shadow-sm border border-border flex flex-col animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="w-full aspect-[4/5] bg-secondary/50 rounded-[2rem] mb-6"></div>
      
      {/* Content Skeleton */}
      <div className="space-y-4 px-1 flex-1 flex flex-col">
        <div>
          <div className="h-6 bg-secondary/60 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-secondary/40 rounded-md w-1/2"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-2.5 pt-1 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-secondary/50 shrink-0"></div>
            <div className="h-4 bg-secondary/40 rounded-md w-2/3"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-secondary/50 shrink-0"></div>
            <div className="h-4 bg-secondary/40 rounded-md w-1/2"></div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
        <div className="h-10 bg-secondary/40 rounded-xl"></div>
        <div className="h-10 bg-secondary/40 rounded-xl"></div>
        <div className="h-10 bg-secondary/40 rounded-xl"></div>
      </div>
    </div>
  );
};

export default BiodataSkeleton;
