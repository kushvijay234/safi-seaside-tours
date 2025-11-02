import React from 'react';

interface LoadingOverlayProps {
  progress: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-[100] flex flex-col justify-center items-center transition-opacity duration-300">
      <div className="flex items-center justify-center space-x-4">
        <i className="fas fa-spinner fa-spin text-ocean-blue text-4xl md:text-5xl"></i>
        <span className="text-xl md:text-2xl font-semibold text-ocean-blue-dark dark:text-ocean-blue-light">Loading...</span>
      </div>
      <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-ocean-blue transition-all duration-150" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-lg font-medium text-ocean-blue-dark dark:text-ocean-blue-light">{Math.round(progress)}%</p>
    </div>
  );
};

export default LoadingOverlay;
