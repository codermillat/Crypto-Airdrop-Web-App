import { debugLog } from './debug';

export const isTelegramWebApp = (): boolean => {
  try {
    // Primary check: WebApp API
    if (window.Telegram?.WebApp) {
      debugLog('WebApp API detected');
      return true;
    }

    // Development mode bypass
    if (import.meta.env.DEV) {
      debugLog('Development mode - bypassing Telegram check');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking Telegram environment:', error);
    return false;
  }
};