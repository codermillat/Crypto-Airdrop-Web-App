import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
}

const LoadingState: React.FC<Props> = ({ message = 'Loading...' }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p>{message}</p>
    </div>
  </div>
);

export default LoadingState;