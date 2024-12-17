import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { isTelegramEnvironment, debugTelegramEnvironment } from '../utils/telegram/environment';
import { initializeTelegramWebApp } from '../utils/telegram';

const TelegramAppCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValidPlatform, setIsValidPlatform] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPlatform = () => {
      // Debug environment information
      debugTelegramEnvironment();
      
      const isTelegram = isTelegramEnvironment();
      setIsValidPlatform(isTelegram);
      
      if (isTelegram) {
        initializeTelegramWebApp();
      }
      
      setIsChecking(false);
    };

    // Small delay to ensure Telegram WebApp API is available
    const timeoutId = setTimeout(checkPlatform, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Initializing...</p>
        </div>
      </div>
    );
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