import { getWebApp, waitForWebApp } from './core';
import { WebAppError } from './errors';
import { validateWebAppUser } from './validation';
import { isTelegramEnvironment, debugTelegramEnvironment } from '../environment';

export const initializeWebApp = async (): Promise<void> => {
  try {
    // Debug environment information
    debugTelegramEnvironment();

    // Check if we're in Telegram environment with more lenient validation
    if (!isTelegramEnvironment()) {
      throw new WebAppError('Please open the app in Telegram');
    }

    // Wait for WebApp to be available
    const webApp = await waitForWebApp();

    // Configure WebApp with error handling
    try {
      await configureWebApp(webApp);
    } catch (configError) {
      console.error('WebApp configuration error:', configError);
      // Continue even if some configuration fails
    }

    console.log('Telegram WebApp initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error);
    throw error instanceof WebAppError ? error : new WebAppError('Failed to initialize WebApp');
  }
};

export const configureWebApp = async (webApp: ReturnType<typeof getWebApp>) => {
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

    return true;
  } catch (error) {
    console.error('Error configuring WebApp:', error);
    // Don't throw, just return false to indicate configuration issues
    return false;
  }
};