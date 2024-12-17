import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { isTelegramEnvironment } from '../../utils/telegram/environment';
import { initializeWebApp } from '../../utils/telegram/webapp';
import { WebAppError } from '../../utils/telegram/webapp/errors';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';

interface Props {
  children: React.ReactNode;
}

const TelegramAppCheck: React.FC<Props> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check environment first
        if (!isTelegramEnvironment()) {
          setError('Please open the app in Telegram');
          return;
        }

        // Initialize WebApp with retries
        let retries = 3;
        while (retries > 0) {
          try {
            await initializeWebApp();
            setIsReady(true);
            setError(null);
            break;
          } catch (err) {
            retries--;
            if (retries === 0) {
              throw err;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      } catch (err) {
        console.error('Telegram initialization error:', err);
        setError(
          err instanceof WebAppError 
            ? err.message 
            : 'Failed to initialize Telegram WebApp'
        );
      } finally {
        setIsChecking(false);
      }
    };

    initialize();
  }, []);

  if (isChecking) {
    return <LoadingState message="Initializing..." />;
  }

  if (!isReady || error) {
    return (
      <ErrorState 
        message={error || 'Please open the app in Telegram'} 
        actionUrl="https://t.me/TONFunZoneBot"
        actionText="Open in Telegram"
      />
    );
  }

  return <>{children}</>;
};

export default TelegramAppCheck;