import { useState, useEffect } from 'react';
import { getTelegramWebAppUser } from '../utils/telegram';
import { validatePlatform, authenticateUser } from '../services/auth/telegramAuth';
import { useSessionStore } from '../services/auth/sessionManager';
import { getPlatformInfo } from '../utils/telegram/platform';

interface InitializationState {
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export const useAppInitialization = (): InitializationState => {
  const [state, setState] = useState<InitializationState>({
    isLoading: true,
    error: null,
    isInitialized: false,
  });
  
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if running in Telegram mobile app
        if (!validatePlatform()) {
          throw new Error('Please open this app in Telegram mobile app');
        }

        // Get Telegram user data
        const user = getTelegramWebAppUser();
        if (!user) {
          throw new Error('Unable to get Telegram user data');
        }

        // Authenticate user with backend
        const authData = await authenticateUser(user);

        // Set session data
        setSession({
          isAuthenticated: true,
          userId: user.id,
          username: user.username || null,
          platform: getPlatformInfo().platform
        });

        setState({
          isLoading: false,
          error: null,
          isInitialized: true
        });
      } catch (error) {
        setState({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Initialization failed',
          isInitialized: false
        });
      }
    };

    initializeApp();
  }, [setSession]);

  return state;
};