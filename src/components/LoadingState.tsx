import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => (
  <div className="flex justify-center items-center py-8">
    <Loader2 className="animate-spin text-blue-500" />
  </div>
);

export default LoadingState;