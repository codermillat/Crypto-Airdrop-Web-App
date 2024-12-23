import { debugLog } from '../debug';

export const isTelegramWebApp = (): boolean => {
  try {
    // Primary check: WebApp API
    if (window.Telegram?.WebApp) {
      debugLog('WebApp API detected');
      return true;
    }

    // URL parameters check
    const searchParams = new URLSearchParams(window.location.search);
    const hasWebAppParams = searchParams.has('tgWebAppData') || 
                          searchParams.has('tgWebAppStartParam') ||
                          searchParams.has('tgWebAppPlatform');
    
    if (hasWebAppParams) {
      debugLog('WebApp URL parameters detected');
      return true;
    }

    // User agent check
    const userAgent = navigator.userAgent.toLowerCase();
    const isTelegramClient = userAgent.includes('telegram') || 
                           userAgent.includes('tgweb') || 
                           userAgent.includes('webview');

    if (isTelegramClient) {
      debugLog('Telegram user agent detected');
      return true;
    }

    debugLog('Not in Telegram environment');
    return false;
  } catch (error) {
    console.error('Error checking Telegram environment:', error);
    return false;
  }
};