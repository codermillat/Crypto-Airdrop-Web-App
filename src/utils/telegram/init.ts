import { TelegramWebApp } from '../../types/telegram';

const INIT_CHECK_INTERVAL = 100; // ms
const MAX_INIT_TIME = 5000; // 5 seconds

export class InitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InitializationError';
  }
}

export const isTelegramWebApp = (): boolean => {
  // Check if we're in Telegram's environment
  if (window.Telegram?.WebApp) {
    return true;
  }

  // Check URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('tgWebAppData') || searchParams.has('tgWebAppStartParam')) {
    return true;
  }

  // Check user agent
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('telegram') || userAgent.includes('tgweb');
};

const waitForWebApp = (): Promise<TelegramWebApp> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkWebApp = () => {
      // Check if WebApp is available
      if (window.Telegram?.WebApp) {
        resolve(window.Telegram.WebApp);
        return;
      }

      // Check if we've exceeded max wait time
      if (Date.now() - startTime > MAX_INIT_TIME) {
        reject(new InitializationError('Telegram WebApp initialization timed out'));
        return;
      }

      // Continue checking
      setTimeout(checkWebApp, INIT_CHECK_INTERVAL);
    };

    checkWebApp();
  });
};

export const initializeWebApp = async (): Promise<void> => {
  try {
    // First check if we're in a valid environment
    if (!isTelegramWebApp()) {
      throw new InitializationError('Please open the app in Telegram');
    }

    // Wait for WebApp to be available
    const webApp = await waitForWebApp();

    // Validate user data
    if (!webApp.initDataUnsafe?.user?.id) {
      throw new InitializationError('Invalid Telegram user data');
    }

    // Configure WebApp
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

    console.log('Telegram WebApp initialized successfully');
  } catch (error) {
    console.error('Telegram WebApp initialization failed:', error);
    throw error instanceof InitializationError ? error : new InitializationError('Failed to initialize WebApp');
  }
};

export const isWebAppInitialized = async (): Promise<boolean> => {
  try {
    if (!isTelegramWebApp()) {
      return false;
    }

    const webApp = await waitForWebApp();
    return !!webApp.initDataUnsafe?.user?.id;
  } catch {
    return false;
  }
};