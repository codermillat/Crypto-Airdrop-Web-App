import { TelegramWebApp } from '../../types/telegram';
import { validateWebAppUser } from './validation';

const TELEGRAM_WEB_APP_TIMEOUT = 3000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class InitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InitializationError';
  }
}

const getWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
};

const waitForWebApp = async (retryCount = 0): Promise<TelegramWebApp> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < TELEGRAM_WEB_APP_TIMEOUT) {
    const webApp = getWebApp();
    if (webApp) {
      return webApp;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  if (retryCount < MAX_RETRIES) {
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return waitForWebApp(retryCount + 1);
  }
  
  throw new InitializationError('Telegram WebApp not available');
};

export const initializeWebApp = async (): Promise<void> => {
  try {
    const webApp = await waitForWebApp();
    const user = webApp.initDataUnsafe?.user;

    if (!validateWebAppUser(user)) {
      throw new InitializationError('Invalid Telegram user data');
    }

    // Configure WebApp
    webApp.expand();
    webApp.enableClosingConfirmation();

    // Set theme colors
    webApp.setHeaderColor?.('#000000');
    webApp.setBackgroundColor?.('#000000');

    // Enable haptic feedback
    webApp.HapticFeedback?.notificationOccurred('success');

    // Mark as ready
    webApp.ready();

    console.log('Telegram WebApp initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
    throw error instanceof InitializationError ? error : new InitializationError('Initialization failed');
  }
};

export const isWebAppInitialized = async (): Promise<boolean> => {
  try {
    const webApp = await waitForWebApp();
    return validateWebAppUser(webApp.initDataUnsafe?.user);
  } catch {
    return false;
  }
};