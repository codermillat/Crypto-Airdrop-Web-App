import { debugLog } from './debug';
import { isTelegramWebApp } from './detection';

export const initializeTelegramWebApp = (): void => {
  try {
    if (!isTelegramWebApp()) {
      console.warn('Not in Telegram WebApp environment');
      return;
    }

    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;

    // Basic initialization
    webApp.ready();
    webApp.expand();

    debugLog('Telegram WebApp initialized');
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
  }
};