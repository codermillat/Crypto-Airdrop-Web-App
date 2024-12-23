import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { initializeWebApp } from '../utils/telegram/webapp/initialization';
import { isTelegramWebApp } from '../utils/telegram/webapp/detection';
import LoadingState from './LoadingState';

const TelegramCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        if (!isTelegramWebApp()) {
          throw new Error('Please open this app in Telegram');
        }

        await initializeWebApp();
        
        if (mounted) {
          setIsValid(true);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to initialize Telegram WebApp');
          setIsValid(false);
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  if (isInitializing) {
    return <LoadingState message="Initializing Telegram WebApp..." />;
  }

  if (!isValid || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <a 
            href="https://t.me/TonFunZoneBot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
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