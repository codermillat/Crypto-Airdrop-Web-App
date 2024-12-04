import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { isTelegramWebApp, initializeTelegramWebApp, getTelegramBotUsername } from '../../utils/telegram';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';

interface Props {
  children: React.ReactNode;
}

const TelegramAppCheck: React.FC<Props> = ({ children }) => {
  const [isValidPlatform, setIsValidPlatform] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPlatform = () => {
      try {
        const isTelegram = isTelegramWebApp();
        setIsValidPlatform(isTelegram);
        
        if (isTelegram) {
          initializeTelegramWebApp();
        }
        
        setError(null);
      } catch (err) {
        console.error('Error checking platform:', err);
        setError('Failed to initialize Telegram app');
        setIsValidPlatform(false);
      } finally {
        setIsChecking(false);
      }
    };

    const timeoutId = setTimeout(checkPlatform, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isChecking) {
    return <LoadingState message="Initializing..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  if (!isValidPlatform) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">
            This app is only accessible through Telegram.
          </p>
          <a 
            href={`https://t.me/${getTelegramBotUsername()}`}
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