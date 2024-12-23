import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { validateTelegramEnvironment } from '../utils/telegram/detection/environment';
import { validateTelegramUser, getTelegramUser } from '../utils/telegram/detection/user';
import { debugLog } from '../utils/telegram/debug';

interface ValidationState {
  isValid: boolean;
  error?: string;
  environmentInfo?: any;
  user?: any;
}

const TelegramCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [validation, setValidation] = useState<ValidationState>({
    isValid: false
  });

  useEffect(() => {
    const checkAccess = () => {
      // Validate Telegram environment
      const envValidation = validateTelegramEnvironment();
      debugLog('Environment validation:', envValidation);

      if (!envValidation.isValid) {
        setValidation({
          isValid: false,
          error: envValidation.error,
          environmentInfo: envValidation.info
        });
        return;
      }

      // Validate user
      const user = getTelegramUser();
      const isUserValid = validateTelegramUser(user);
      debugLog('User validation:', { isUserValid, user });

      if (!isUserValid) {
        setValidation({
          isValid: false,
          error: 'Invalid user data',
          environmentInfo: envValidation.info,
          user
        });
        return;
      }

      setValidation({
        isValid: true,
        environmentInfo: envValidation.info,
        user
      });
    };

    checkAccess();
  }, []);

  if (!validation.isValid) {
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
          <p className="break-all">User Agent: {validation.environmentInfo?.userAgent}</p>
          <p>Platform: {validation.environmentInfo?.platform}</p>
          {validation.user && (
            <>
              <p>User ID: {validation.user.id}</p>
              <p>Name: {validation.user.first_name} {validation.user.last_name}</p>
              <p>Username: @{validation.user.username}</p>
            </>
          )}
          {validation.error && (
            <p className="text-red-500">Error: {validation.error}</p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TelegramCheck;