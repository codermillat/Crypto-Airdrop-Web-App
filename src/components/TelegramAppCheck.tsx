import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { isTelegramWebApp, validateTelegramEnvironment } from '../utils/telegram/environment/detection';
import { debugTelegramEnvironment } from '../utils/telegram/debug';
import { initializeWebApp } from '../utils/telegram/webapp/initialization';

const TelegramAppCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValidPlatform, setIsValidPlatform] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPlatform = async () => {
      try {
        // Debug environment information
        debugTelegramEnvironment();
        
        // First check if we're in Telegram environment
        if (!isTelegramWebApp()) {
          setError('Please open this app in Telegram');
          setIsValidPlatform(false);
          return;
        }

        // Then validate the specific environment requirements
        const validationError = validateTelegramEnvironment();
        if (validationError) {
          setError(validationError);
          setIsValidPlatform(false);
          return;
        }

        // Initialize WebApp
        await initializeWebApp();
        
        setIsValidPlatform(true);
        setError(null);
      } catch (err) {
        console.error('Platform check error:', err);
        setError('Failed to initialize Telegram app');
        setIsValidPlatform(false);
      } finally {
        setIsChecking(false);
      }
    };

    // Increased delay to ensure Telegram WebApp API is fully loaded
    const timeoutId = setTimeout(checkPlatform, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Initializing Telegram app...</p>
        </div>
      </div>
    );
  }

  if (!isValidPlatform || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">
            {error || 'Please open this app in Telegram'}
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
