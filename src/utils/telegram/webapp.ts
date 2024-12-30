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
    console.log('Attempting to initialize Telegram WebApp...');
    const webApp = await waitForWebApp();
    console.log('Telegram WebApp object:', webApp);

    // Ensure we're in a valid Telegram WebApp environment
    if (!webApp.initDataUnsafe?.user?.id) {
      console.error('initDataUnsafe does not contain a valid user ID:', webApp.initDataUnsafe);
      throw new Error('Invalid Telegram WebApp environment');
    }

    // Configure WebApp
    webApp.expand();
    if (typeof webApp.enableClosingConfirmation === 'function') {
      webApp.enableClosingConfirmation();
    }

    // Set theme colors
    if (typeof webApp.setHeaderColor === 'function') {
      webApp.setHeaderColor('#000000');
    }
    if (typeof webApp.setBackgroundColor === 'function') {
      webApp.setBackgroundColor('#000000');
    }

    // Enable haptic feedback if available
    if (webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    // Mark as ready
    webApp.ready();

    console.log('Telegram WebApp initialized successfully with initData:', webApp.initData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to initialize Telegram WebApp:', error.message, error.stack);
    } else {
      console.error('Failed to initialize Telegram WebApp:', error);
    }
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
