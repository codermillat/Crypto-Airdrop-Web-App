import { debugLog } from '../debug';

// Platform-specific checks
const isTelegramMobileApp = (): boolean => {
  try {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return false;

    // Check platform directly from WebApp
    const platform = webApp.platform.toLowerCase();
    const isMobile = platform === 'android' || platform === 'ios';
    
    debugLog('Platform check:', { platform, isMobile });
    return isMobile;
  } catch (error) {
    debugLog('Error checking mobile platform:', error);
    return false;
  }
};

const isTelegramWebView = (): boolean => {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    const isWebView = userAgent.includes('telegram') || 
                     userAgent.includes('tgweb') ||
                     userAgent.includes('webview');
    
    debugLog('WebView check:', { userAgent, isWebView });
    return isWebView;
  } catch (error) {
    debugLog('Error checking WebView:', error);
    return false;
  }
};

const hasTelegramWebAppData = (): boolean => {
  try {
    const webApp = window.Telegram?.WebApp;
    if (webApp?.initData) {
      debugLog('Found WebApp init data');
      return true;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const hasData = searchParams.has('tgWebAppData') || 
                   searchParams.has('tgWebAppStartParam') ||
                   searchParams.has('tgWebAppPlatform');
    
    debugLog('URL params check:', { hasData, params: window.location.search });
    return hasData;
  } catch (error) {
    debugLog('Error checking WebApp data:', error);
    return false;
  }
};

export const isTelegramEnvironment = (): boolean => {
  try {
    // First check if WebApp is available
    if (window.Telegram?.WebApp) {
      debugLog('WebApp is available');
      return true;
    }

    // Then check if we're in mobile app
    if (isTelegramMobileApp()) {
      debugLog('In Telegram mobile app');
      return true;
    }

    // Check for WebView
    if (isTelegramWebView()) {
      debugLog('In Telegram WebView');
      return true;
    }

    // Finally check for WebApp data
    if (hasTelegramWebAppData()) {
      debugLog('Has WebApp data');
      return true;
    }

    debugLog('Not in Telegram environment');
    return false;
  } catch (error) {
    debugLog('Error checking Telegram environment:', error);
    return false;
  }
};

export const validateTelegramEnvironment = (): string | null => {
  try {
    // Check if WebApp is available
    if (!window.Telegram?.WebApp) {
      return 'Telegram WebApp is not available';
    }

    // Get platform information
    const platform = window.Telegram.WebApp.platform.toLowerCase();
    debugLog('Platform check:', { platform });

    // Check if we're on mobile
    if (platform !== 'android' && platform !== 'ios') {
      return 'Please open this app in Telegram mobile app';
    }

    // Validate init data
    if (!window.Telegram.WebApp.initData) {
      return 'Invalid WebApp initialization';
    }

    return null;
  } catch (error) {
    debugLog('Error validating environment:', error);
    return 'Failed to validate Telegram environment';
  }
};