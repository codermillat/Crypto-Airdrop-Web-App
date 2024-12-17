import { TelegramWebApp } from '../types/webapp';
import { debugLog } from '../debug';

export const configureWebApp = (webApp: TelegramWebApp): boolean => {
  try {
    expandWebApp(webApp);
    configureClosing(webApp);
    configureTheme(webApp);
    configureHaptics(webApp);
    webApp.ready();
    return true;
  } catch (error) {
    debugLog('WebApp configuration error:', error);
    return false;
  }
};

const expandWebApp = (webApp: TelegramWebApp) => {
  webApp.expand();
};

const configureClosing = (webApp: TelegramWebApp) => {
  if (typeof webApp.enableClosingConfirmation === 'function') {
    webApp.enableClosingConfirmation();
  }
};

const configureTheme = (webApp: TelegramWebApp) => {
  if (typeof webApp.setHeaderColor === 'function') {
    webApp.setHeaderColor('#000000');
  }
  if (typeof webApp.setBackgroundColor === 'function') {
    webApp.setBackgroundColor('#000000');
  }
};

const configureHaptics = (webApp: TelegramWebApp) => {
  if (webApp.HapticFeedback) {
    webApp.HapticFeedback.notificationOccurred('success');
  }
};