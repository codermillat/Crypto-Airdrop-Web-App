import { debugLog } from './debug';
import { hasWebAppParams } from './detection/params';
import { isTelegramUserAgent } from './detection/userAgent';
import { hasTelegramProxy } from './detection/proxy';

export const isTelegramWebApp = (): boolean => {
  try {
    // Primary check: WebApp API
    if (window.Telegram?.WebApp) {
      debugLog('WebApp API detected');
      return true;
    }

    // Secondary checks
    const params = hasWebAppParams();
    const userAgent = isTelegramUserAgent();
    const proxy = hasTelegramProxy();

    const isValid = params || userAgent || proxy;
    
    debugLog('Telegram environment check:', { 
      params, 
      userAgent, 
      proxy,
      isValid 
    });

    return isValid;
  } catch (error) {
    console.error('Error checking Telegram environment:', error);
    return false;
  }
};