import { debugLog } from '../debug';

export const isTelegramEnvironment = (): boolean => {
  try {
    if (hasWebAppAPI()) return true;
    if (hasTelegramParams()) return true;
    if (hasTelegramUserAgent()) return true;
    if (hasTelegramProxy()) return true;
    return false;
  } catch (error) {
    debugLog('Error checking Telegram environment:', error);
    return true; // Assume true to avoid false negatives
  }
};

const hasWebAppAPI = (): boolean => {
  return !!window.Telegram?.WebApp;
};

const hasTelegramParams = (): boolean => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has('tgWebAppData') || 
         searchParams.has('tgWebAppStartParam') ||
         searchParams.has('tgWebAppPlatform');
};

const hasTelegramUserAgent = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('telegram') || 
         userAgent.includes('tgweb') || 
         userAgent.includes('webview');
};

const hasTelegramProxy = (): boolean => {
  return typeof window !== 'undefined' && 'TelegramWebviewProxy' in window;
};