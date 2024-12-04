import { useState, useEffect } from 'react';
import { TelegramUser } from '../types/telegram';
import { 
  getTelegramUser, 
  validateTelegramUser, 
  TelegramUserError 
} from '../utils/telegram/user';

interface UseTelegramUserReturn {
  user: TelegramUser | null;
  isLoading: boolean;
  error: Error | null;
  isValid: boolean;
}

export const useTelegramUser = (): UseTelegramUserReturn => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const initializeUser = () => {
      try {
        const telegramUser = getTelegramUser();
        
        if (!telegramUser) {
          throw new TelegramUserError('No Telegram user data available');
        }

        const isValidUser = validateTelegramUser(telegramUser);
        
        if (!isValidUser) {
          throw new TelegramUserError('Invalid Telegram user data');
        }

        setUser(telegramUser);
        setIsValid(true);
        setError(null);
      } catch (err) {
        console.error('Telegram user initialization error:', err);
        setUser(null);
        setIsValid(false);
        setError(err instanceof Error ? err : new Error('Failed to initialize Telegram user'));
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    isValid
  };
};

export default useTelegramUser;