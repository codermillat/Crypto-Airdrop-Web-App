import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { isTelegramWebApp, initializeTelegramWebApp } from '../../utils/telegram';
import LoadingState from '../common/LoadingState';

interface Props {
  children: React.ReactNode;
}

const TelegramAppCheck: React.FC<Props> = ({ children }) => {
  const [isValidPlatform, setIsValidPlatform] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPlatform = () => {
      const isTelegram = isTelegramWebApp();
      setIsValidPlatform(isTelegram);
      
      if (isTelegram) {
        initializeTelegramWebApp();
      }
      
      setIsChecking(false);
    };

    const timeoutId = setTimeout(checkPlatform, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isChecking) {
    return <LoadingState message="Loading..." />;
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
            href="https://t.me/TonFunZoneBot"
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