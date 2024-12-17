import { WebAppInitData } from '../../types/telegram';

export const isTelegramEnvironment = (): boolean => {
  try {
    // Primary check: WebApp API
    if (window.Telegram?.WebApp) {
      return true;
    }

    // Check URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const hasWebAppParams = searchParams.has('tgWebAppData') || 
                          searchParams.has('tgWebAppStartParam') ||
                          searchParams.has('tgWebAppPlatform');
    
    if (hasWebAppParams) {
      return true;
    }

    // Check user agent for Telegram-specific strings
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('telegram') || 
        userAgent.includes('tgweb') || 
        userAgent.includes('webview')) {
      return true;
    }

    // Check for Telegram-specific objects
    if (typeof window !== 'undefined' && 'TelegramWebviewProxy' in window) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking Telegram environment:', error);
    // In case of any error, assume we're in Telegram to avoid false negatives
    return true;
  }
};

export const getEnvironmentInfo = () => ({
  isTelegram: isTelegramEnvironment(),
  platform: window.Telegram?.WebApp?.platform || 'unknown',
  version: window.Telegram?.WebApp?.version || 'unknown',
  initData: window.Telegram?.WebApp?.initData || null,
  userAgent: navigator.userAgent,
  searchParams: window.location.search
});

// Debug function to help troubleshoot environment detection
export const debugTelegramEnvironment = () => {
  const info = {
    hasWebApp: !!window.Telegram?.WebApp,
    webAppData: window.Telegram?.WebApp?.initData,
    userAgent: navigator.userAgent,
    urlParams: window.location.search,
    platform: window.Telegram?.WebApp?.platform,
    hasProxy: 'TelegramWebviewProxy' in window
  };
  
  console.log('Telegram Environment Debug:', info);
  return info;
};