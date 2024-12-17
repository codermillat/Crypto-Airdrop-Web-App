import { debugLog } from '../debug';

interface PlatformInfo {
  platform: string;
  isMobile: boolean;
  isWebView: boolean;
  hasWebApp: boolean;
}

export const detectPlatform = (): PlatformInfo => {
  const webApp = window.Telegram?.WebApp;
  const platform = webApp?.platform?.toLowerCase() || 'unknown';
  const userAgent = navigator.userAgent.toLowerCase();

  const info = {
    platform,
    isMobile: platform === 'android' || platform === 'ios',
    isWebView: userAgent.includes('telegram') || userAgent.includes('webview'),
    hasWebApp: !!webApp
  };

  debugLog('Platform detection:', info);
  return info;
};

export const validatePlatform = (): { isValid: boolean; error?: string } => {
  const { platform, isMobile, hasWebApp } = detectPlatform();

  if (!hasWebApp) {
    return { 
      isValid: false, 
      error: 'Telegram WebApp is not available' 
    };
  }

  if (!isMobile) {
    return { 
      isValid: false, 
      error: 'Please open this app in Telegram mobile app' 
    };
  }

  return { isValid: true };
};