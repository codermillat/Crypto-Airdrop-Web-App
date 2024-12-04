import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<Props> = ({ message, onRetry }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center p-4">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

export default ErrorState;