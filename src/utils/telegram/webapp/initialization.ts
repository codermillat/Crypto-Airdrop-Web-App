import { debugLog } from '../debug';
import { WebAppError } from './errors';
import { validateTelegramEnvironment } from '../environment/detection';

export const initializeWebApp = async (): Promise<void> => {
  try {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) {
      throw new WebAppError('Telegram WebApp not available');
    }

    // Validate environment
    const validationError = validateTelegramEnvironment();
    if (validationError) {
      throw new WebAppError(validationError);
    }

    // Configure WebApp
    webApp.expand();
    
    if (webApp.enableClosingConfirmation) {
      webApp.enableClosingConfirmation();
    }

    if (webApp.setHeaderColor) {
      webApp.setHeaderColor('#000000');
    }

    if (webApp.setBackgroundColor) {
      webApp.setBackgroundColor('#000000');
    }

    if (webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    // Mark as ready
    webApp.ready();
    
    debugLog('WebApp initialized successfully');
  } catch (error) {
    debugLog('WebApp initialization failed:', error);
    throw error instanceof WebAppError ? error : new WebAppError('Failed to initialize WebApp');
  }
};