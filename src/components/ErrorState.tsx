import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<Props> = ({ 
  message = 'Something went wrong', 
  onRetry 
}) => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <p className="text-gray-400 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;