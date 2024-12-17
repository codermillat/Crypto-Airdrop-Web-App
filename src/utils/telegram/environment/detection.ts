import { debugLog } from '../debug';

// Platform-specific checks
const isTelegramMobileApp = (): boolean => {
  const platform = window.Telegram?.WebApp?.platform;
  return platform === 'android' || platform === 'ios';
};

const isTelegramWebView = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('telegram') || userAgent.includes('tgweb');
};

const hasTelegramWebAppData = (): boolean => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has('tgWebAppData') || 
         searchParams.has('tgWebAppStartParam') ||
         searchParams.has('tgWebAppPlatform');
};

const hasTelegramWebAppAPI = (): boolean => {
  return !!window.Telegram?.WebApp?.initData;
};

export const isTelegramEnvironment = (): boolean => {
  try {
    // Check if we're in the mobile app first
    if (isTelegramMobileApp()) {
      debugLog('Detected Telegram mobile app');
      return true;
    }

    // Then check for WebView
    if (isTelegramWebView()) {
      debugLog('Detected Telegram WebView');
      return true;
    }

    // Check for WebApp data in URL
    if (hasTelegramWebAppData()) {
      debugLog('Detected Telegram WebApp data in URL');
      return true;
    }

    // Finally check for WebApp API
    if (hasTelegramWebAppAPI()) {
      debugLog('Detected Telegram WebApp API');
      return true;
    }

    debugLog('Not in Telegram environment');
    return false;
  } catch (error) {
    debugLog('Error checking Telegram environment:', error);
    return false; // Changed to false to be more strict
  }
};

export const validateTelegramEnvironment = (): string | null => {
  if (!window.Telegram?.WebApp) {
    return 'Telegram WebApp API not available';
  }

  const platform = window.Telegram.WebApp.platform;
  if (!platform) {
    return 'Telegram platform not detected';
  }

  if (platform !== 'android' && platform !== 'ios') {
    return 'Please open this app in the Telegram mobile app';
  }

  return null;
};