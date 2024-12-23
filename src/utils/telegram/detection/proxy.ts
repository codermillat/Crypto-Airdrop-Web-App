import { debugLog } from '../debug';

export const hasTelegramProxy = (): boolean => {
  try {
    return 'TelegramWebviewProxy' in window;
  } catch (error) {
    debugLog('Error checking Telegram proxy:', error);
    return false;
  }
};