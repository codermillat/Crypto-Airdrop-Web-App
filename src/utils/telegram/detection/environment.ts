import { debugLog } from '../debug';

export const getTelegramEnvironmentInfo = () => {
  const webApp = window.Telegram?.WebApp;
  const userAgent = navigator.userAgent;
  const platform = webApp?.platform || 'unknown';
  const initData = webApp?.initData || null;

  return {
    webApp,
    userAgent,
    platform,
    initData,
    isTelegramClient: userAgent.includes('TelegramWebView') || 
                      userAgent.includes('Telegram') ||
                      !!webApp
  };
};

export const validateTelegramEnvironment = () => {
  const info = getTelegramEnvironmentInfo();
  debugLog('Environment info:', info);

  if (!info.webApp) {
    return {
      isValid: false,
      error: 'WebApp API not available'
    };
  }

  if (!info.webApp.initDataUnsafe?.user) {
    return {
      isValid: false,
      error: 'User data not available'
    };
  }

  return {
    isValid: true,
    info
  };
};