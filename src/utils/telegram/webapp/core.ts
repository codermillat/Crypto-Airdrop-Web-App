import { TelegramWebApp } from '../../../types/telegram';
import { WebAppError } from './errors';

const INIT_TIMEOUT = 5000; // 5 seconds

export const getWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
};

export const waitForWebApp = async (): Promise<TelegramWebApp> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < INIT_TIMEOUT) {
    const webApp = getWebApp();
    if (webApp) {
      return webApp;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  throw new WebAppError('Telegram WebApp not available');
};