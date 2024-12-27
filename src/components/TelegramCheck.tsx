import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { initializeWebApp } from '../utils/telegram/webapp/initialization';
import { isTelegramWebApp } from '../utils/telegram/detection';
import LoadingState from './LoadingState';

const TelegramCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize WebApp
        await initializeWebApp();
        setIsValid(true);
        setError(null);
      } catch (err: any) {
        if (err.message === 'Telegram WebApp is not available') {
          setError('Telegram WebApp is not available');
        } else if (err.message === 'WebApp initialization timed out') {
          setError('WebApp initialization timed out');
        } else {
          setError('Failed to initialize Telegram WebApp');
        }
        setIsValid(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  if (isInitializing) {
    return (
      <div className="flex flex-col justify-center items-center py-8">
        <LoadingState />
        <p className="mt-4 text-gray-400">Initializing Telegram WebApp...</p>
      </div>
    );
  }

  if (!isValid || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          
          <a 
            href="https://t.me/TonFunZoneBot"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Open in Telegram
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TelegramCheck;
