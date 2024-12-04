import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import LoadingState from '../common/LoadingState';
import { TelegramWebApp } from '../../types/telegram';

interface Props {
  children: React.ReactNode;
}

const TelegramAppCheck: React.FC<Props> = ({ children }) => {
  const [isValidPlatform, setIsValidPlatform] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeTelegram = async () => {
      try {
        // Check if we're in Telegram WebApp
        const webApp = window.Telegram?.WebApp;
        if (!webApp) {
          setError('This app must be opened in Telegram');
          setIsValidPlatform(false);
          return;
        }

        // Initialize WebApp - only set colors if properties exist
        if (webApp.headerColor) {
          webApp.headerColor = '#000000';
        }
        if (webApp.backgroundColor) {
          webApp.backgroundColor = '#000000';
        }

        setIsValidPlatform(true);
        setError(null);
      } catch (err: any) {
        console.error('Telegram initialization error:', err);
        setError(err?.message || 'Failed to initialize Telegram app');
        setIsValidPlatform(false);
      } finally {
        setIsChecking(false);
      }
    };

    initializeTelegram();
  }, []);

  if (isChecking) {
    return <LoadingState message="Initializing..." />;
  }

  if (error || !isValidPlatform) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">
            {error || 'This app is only accessible through Telegram.'}
          </p>
          <a 
            href={`https://t.me/${import.meta.env.VITE_TELEGRAM_BOT_USERNAME}`}
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

export default TelegramAppCheck;
