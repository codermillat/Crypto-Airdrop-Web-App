import { TelegramWebApp } from '../../../types/telegram';
import { debugLog } from '../debug';
import { WebAppError } from './errors';

const POLLING_INTERVAL = 50; // ms
const MAX_RETRIES = 100; // 5 seconds total

export const getWebApp = (): TelegramWebApp | null => {
  const webApp = window.Telegram?.WebApp;
  debugLog('Getting WebApp:', { available: !!webApp });
  return webApp || null;
};

export const waitForWebApp = async (): Promise<TelegramWebApp> => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    const webApp = getWebApp();
    
    if (webApp) {
      debugLog('WebApp found');
      return webApp;
    }

    await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL));
    retries++;
    
    if (retries % 20 === 0) { // Log every second
      debugLog(`Waiting for WebApp... (${retries / 20}s)`);
    }
  }
  
  throw new WebAppError('Telegram WebApp initialization timed out');
};