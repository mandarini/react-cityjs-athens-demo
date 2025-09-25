import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center">
        <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we set up your session</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;