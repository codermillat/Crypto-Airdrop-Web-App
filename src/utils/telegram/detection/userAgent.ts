import { TELEGRAM_USER_AGENTS } from './constants';
import { debugLog } from '../debug';

export const isTelegramUserAgent = (): boolean => {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    return TELEGRAM_USER_AGENTS.some(agent => userAgent.includes(agent));
  } catch (error) {
    debugLog('Error checking user agent:', error);
    return false;
  }
};