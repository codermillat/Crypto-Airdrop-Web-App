import { useState, useEffect } from 'react';
import { TelegramWebApp } from '../types/telegram';
import { initializeWebApp, isWebAppInitialized, InitializationError } from '../utils/telegram/init';
import { validatePlatform } from '../utils/telegram/validation';

interface UseTelegramWebAppReturn {
  webApp: TelegramWebApp | null;
  isLoading: boolean;
  error: Error | null;
  isInitialized: boolean;
}

export const useTelegramWebApp = (): UseTelegramWebAppReturn => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!validatePlatform()) {
          throw new InitializationError('Please open the app in Telegram');
        }

        const initialized = await isWebAppInitialized();
        if (!initialized) {
          await initializeWebApp();
        }

        setWebApp(window.Telegram?.WebApp || null);
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('WebApp initialization error:', err);
        setWebApp(null);
        setIsInitialized(false);
        setError(err instanceof Error ? err : new Error('Failed to initialize WebApp'));
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return {
    webApp,
    isLoading,
    error,
    isInitialized
  };
};

export default useTelegramWebApp;