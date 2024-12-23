import { TelegramWebApp } from '../../../types/telegram';
import { debugLog } from '../debug';

const POLLING_INTERVAL = 50; // ms
const MAX_RETRIES = 100; // 5 seconds total

export const getWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
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
  
  throw new Error('Telegram WebApp initialization timed out');
};