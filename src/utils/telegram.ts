import { TelegramUser } from '../types/telegram';

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

export const getTelegramWebAppUser = (): TelegramUser | null => {
  try {
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

export const validateTelegramUser = (user: TelegramUser | null): boolean => {
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
  try {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;

    // Expand to full height
    webApp.expand();

    // Set theme colors
    if (webApp.setHeaderColor) {
      webApp.setHeaderColor('#000000');
    }
    if (webApp.setBackgroundColor) {
      webApp.setBackgroundColor('#000000');
    }

    // Enable haptic feedback
    if (webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    // Mark as ready
    webApp.ready();
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
  }
};