import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { validateInitData } from '../utils/telegram/auth/validation';
import LoadingState from './LoadingState';
import TelegramLink from './common/TelegramLink';

interface Props {
  children: React.ReactNode;
}

const TelegramAuthCheck: React.FC<Props> = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const webApp = window.Telegram?.WebApp;
        
        if (!webApp) {
          setIsValid(false);
          return;
        }

        const isValidData = validateInitData(webApp.initData);
        setIsValid(isValidData);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsValid(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return <LoadingState message="Verifying access..." />;
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-gray-400 mb-4">
            Please open this app in Telegram
          </p>
          <TelegramLink className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TelegramAuthCheck;