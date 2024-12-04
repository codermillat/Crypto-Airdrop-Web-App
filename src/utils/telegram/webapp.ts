import { TelegramWebApp } from '../../types/telegram';

const TELEGRAM_WEB_APP_TIMEOUT = 3000; // 3 seconds timeout

export const getWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
};

export const waitForWebApp = async (): Promise<TelegramWebApp> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < TELEGRAM_WEB_APP_TIMEOUT) {
    const webApp = getWebApp();
    if (webApp) {
      return webApp;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  throw new Error('Telegram WebApp not available');
};

export const initializeWebApp = async (): Promise<void> => {
  try {
    const webApp = await waitForWebApp();

    // Ensure we're in a valid Telegram WebApp environment
    if (!webApp.initDataUnsafe?.user?.id) {
      throw new Error('Invalid Telegram WebApp environment');
    }

    // Configure WebApp
    webApp.expand();
    webApp.enableClosingConfirmation();

    // Set theme colors
    if (webApp.setHeaderColor) {
      webApp.setHeaderColor('#000000');
    }
    if (webApp.setBackgroundColor) {
      webApp.setBackgroundColor('#000000');
    }

    // Enable haptic feedback if available
    if (webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    // Mark as ready
    webApp.ready();

    console.log('Telegram WebApp initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
    throw error;
  }
};

export const isWebAppAvailable = async (): Promise<boolean> => {
  try {
    const webApp = await waitForWebApp();
    return !!(webApp?.initDataUnsafe?.user?.id);
  } catch {
    return false;
  }
};