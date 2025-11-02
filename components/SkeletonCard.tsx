import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="mt-6 flex justify-between items-center">
          <div className="h-7 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
