import { TELEGRAM_USER_AGENTS, TELEGRAM_URL_PARAMS } from './constants';
import { isMacOSClient } from './platform';
import { debugLog } from '../debug';

const hasWebAppAPI = (): boolean => {
  return !!window.Telegram?.WebApp;
};

const hasWebAppParams = (): boolean => {
  const searchParams = new URLSearchParams(window.location.search);
  return TELEGRAM_URL_PARAMS.some(param => searchParams.has(param));
};

const hasTelegramUserAgent = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return TELEGRAM_USER_AGENTS.some(agent => userAgent.includes(agent));
};

const hasTelegramProxy = (): boolean => {
  return 'TelegramWebviewProxy' in window;
};

export const isTelegramWebApp = (): boolean => {
  try {
    // Debug logging
    debugLog('Checking Telegram environment:', {
      hasWebAppAPI: hasWebAppAPI(),
      hasWebAppParams: hasWebAppParams(),
      hasTelegramUserAgent: hasTelegramUserAgent(),
      hasTelegramProxy: hasTelegramProxy(),
      isMacOS: isMacOSClient()
    });

    // Special handling for macOS client
    if (isMacOSClient() && hasTelegramProxy()) {
      return true;
    }

    // Check for WebApp API
    if (hasWebAppAPI()) {
      return true;
    }

    // Check URL parameters
    if (hasWebAppParams()) {
      return true;
    }

    // Check user agent
    if (hasTelegramUserAgent()) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking Telegram environment:', error);
    return false;
  }
};