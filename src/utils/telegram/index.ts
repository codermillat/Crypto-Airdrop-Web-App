export * from './webapp';

export const isTelegramWebApp = (): boolean => {
  try {
    // Check if we're in a Telegram WebApp environment
    if (window.Telegram?.WebApp) {
      return true;
    }

    // Check URL parameters that indicate Telegram WebApp
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('tgWebAppData') || searchParams.has('tgWebAppStartParam')) {
      return true;
    }

    // Check if we're in Telegram's in-app browser
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('telegram') || userAgent.includes('tgweb');
  } catch (error) {
    console.error('Error checking Telegram WebApp:', error);
    return false;
  }
};

export const getTelegramWebAppUser = () => {
  try {
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

export const validateTelegramUser = (user: any): boolean => {
  if (!user) return false;
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

export const initializeTelegramWebApp = (): void => {
  if (isWebAppAvailable()) {
    initializeWebApp();
  }
};