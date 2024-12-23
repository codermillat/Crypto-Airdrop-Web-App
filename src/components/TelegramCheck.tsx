import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { debugTelegramEnvironment } from '../utils/telegram/debug';
import { getTelegramWebAppUser } from '../utils/telegram';

const TelegramCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkEnvironment = () => {
      const info = debugTelegramEnvironment();
      const telegramUser = getTelegramWebAppUser();
      setDebugInfo(info);
      setUser(telegramUser);

      // Only allow access through Telegram WebApp
      if (!window.Telegram?.WebApp) {
        setIsValid(false);
        return;
      }

      setIsValid(true);
    };

    checkEnvironment();
  }, []);

  if (!isValid) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <Shield className="w-16 h-16 text-red-500 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
        <p className="text-center mb-8">
          This app can only be accessed through the Telegram mobile app via @TonFunZoneBot.
        </p>
        <div className="bg-red-500/10 text-red-500 rounded-lg p-4 mb-8 text-center">
          Not running in Telegram WebApp environment. Please open this app through the @TonFunZoneBot.
        </div>
        
        <div className="text-left w-full max-w-md space-y-2">
          <h2 className="text-lg font-semibold mb-2">Debug Info:</h2>
          <p>User Agent: {debugInfo?.userAgent}</p>
          <p>Platform: {debugInfo?.platform}</p>
          {user && (
            <>
              <p>User ID: {user.id}</p>
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Username: @{user.username}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TelegramCheck;