export * from './webapp';
export * from './security';
export * from './types';

export const getTelegramWebAppUser = () => {
  try {
    const webApp = window.Telegram?.WebApp;
    if (!webApp?.initDataUnsafe?.user) {
      throw new Error('No Telegram user data available');
    }
    return webApp.initDataUnsafe.user;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

export const validateTelegramUser = (user: any): boolean => {
  if (!user?.id || !user?.first_name) {
    return false;
  }
  return true;
};

export const getTelegramPlatform = (): string => {
  try {
    return window.Telegram?.WebApp?.platform || 'unknown';
  } catch (error) {
    console.error('Error getting Telegram platform:', error);
    return 'unknown';
  }
};