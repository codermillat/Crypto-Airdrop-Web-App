import { debugLog } from '../debug';

export const isWebAppAvailable = (): boolean => {
  const hasWebApp = 'Telegram' in window && 'WebApp' in window.Telegram;
  debugLog('WebApp availability check:', { hasWebApp });
  return hasWebApp;
};

export const isWebAppReady = (): boolean => {
  if (!isWebAppAvailable()) return false;
  
  const webApp = window.Telegram.WebApp;
  const isReady = !!(webApp.initDataUnsafe && webApp.initDataUnsafe.user);
  debugLog('WebApp ready check:', { isReady });
  return isReady;
};