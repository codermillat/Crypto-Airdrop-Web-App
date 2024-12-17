import { getWebApp, waitForWebApp } from './core';
import { WebAppError } from './errors';
import { validateWebAppUser } from './validation';

export const initializeWebApp = async (): Promise<void> => {
  try {
    // First check if we're in Telegram environment
    if (!window.Telegram?.WebApp) {
      throw new WebAppError('Please open the app in Telegram');
    }

    const webApp = await waitForWebApp();

    // Validate user data before proceeding
    if (!validateWebAppUser(webApp.initDataUnsafe?.user)) {
      throw new WebAppError('Invalid or missing user data');
    }

    // Configure WebApp with error handling
    try {
      configureWebApp(webApp);
    } catch (configError) {
      console.error('WebApp configuration error:', configError);
      throw new WebAppError('Failed to configure WebApp');
    }

    console.log('Telegram WebApp initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
    throw error instanceof WebAppError ? error : new WebAppError('Failed to initialize WebApp');
  }
};

export const configureWebApp = (webApp: ReturnType<typeof getWebApp>) => {
  if (!webApp) {
    throw new WebAppError('WebApp not available');
  }

  try {
    // Expand to full height
    webApp.expand();

    // Enable closing confirmation if available
    if (typeof webApp.enableClosingConfirmation === 'function') {
      webApp.enableClosingConfirmation();
    }

    // Set theme colors if available
    if (typeof webApp.setHeaderColor === 'function') {
      webApp.setHeaderColor('#000000');
    }
    if (typeof webApp.setBackgroundColor === 'function') {
      webApp.setBackgroundColor('#000000');
    }

    // Enable haptic feedback if available
    if (webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    // Mark as ready
    webApp.ready();
  } catch (error) {
    console.error('Error configuring WebApp:', error);
    throw new WebAppError('Failed to configure WebApp');
  }
};