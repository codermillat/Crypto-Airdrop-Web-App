import { TelegramWebApp } from '../../types/telegram';

const TELEGRAM_WEB_APP_TIMEOUT = 10000; // Increased timeout to 10 seconds

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
  
  throw new Error('Telegram WebApp not available after timeout');
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
    // Add more specific error handling and logging here.  For example, check the error type and log additional details.
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
    // Re-throw the error to be handled by the calling function.
    throw error;
  }
};

export const isWebAppAvailable = async (): Promise<boolean> => {
  try {
    const webApp = await waitForWebApp();
    return !!(webApp?.initDataUnsafe?.user?.id);
  } catch (error) {
    console.error('Error checking WebApp availability:', error);
    return false;
  }
};
