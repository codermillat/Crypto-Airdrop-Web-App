import { TelegramWebApp } from '../../types/telegram';

export const getWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
};

export const initializeWebApp = (): void => {
  const webApp = getWebApp();
  if (!webApp) return;

  try {
    // Expand to full height
    webApp.expand();

    // Set theme colors
    webApp.setHeaderColor('#000000');
    webApp.setBackgroundColor('#000000');

    // Enable haptic feedback
    if (webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    // Mark as ready
    webApp.ready();
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
  }
};

export const isWebAppAvailable = (): boolean => {
  try {
    const webApp = getWebApp();
    if (!webApp) return false;

    // Check if essential methods are available
    return typeof webApp.ready === 'function' && 
           typeof webApp.expand === 'function';
  } catch {
    return false;
  }
};