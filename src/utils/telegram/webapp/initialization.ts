import { getWebApp, waitForWebApp } from './core';
import { WebAppError } from './errors';
import { validateWebAppUser } from './validation';

export const initializeWebApp = async (): Promise<void> => {
  try {
    const webApp = await waitForWebApp();

    if (!validateWebAppUser(webApp.initDataUnsafe?.user)) {
      throw new WebAppError('Invalid user data');
    }

    // Configure WebApp
    configureWebApp(webApp);

    console.log('Telegram WebApp initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
    throw error instanceof WebAppError ? error : new WebAppError('Initialization failed');
  }
};

export const configureWebApp = (webApp: ReturnType<typeof getWebApp>) => {
  if (!webApp) return;

  // Expand to full height
  webApp.expand();

  // Enable closing confirmation
  if (webApp.enableClosingConfirmation) {
    webApp.enableClosingConfirmation();
  }

  // Set theme colors
  if (webApp.setHeaderColor) {
    webApp.setHeaderColor('#000000');
  }
  if (webApp.setBackgroundColor) {
    webApp.setBackgroundColor('#000000');
  }

  // Enable haptic feedback
  if (webApp.HapticFeedback) {
    webApp.HapticFeedback.notificationOccurred('success');
  }

  // Mark as ready
  webApp.ready();
};