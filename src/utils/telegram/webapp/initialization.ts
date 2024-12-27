import { debugLog } from '../debug';
import { performInitialChecks } from './initialization/checks';
import { configureWebApp } from './initialization/config';
import { WebAppError } from './errors';

export const initializeWebApp = async (): Promise<void> => {
  try {
    debugLog('Starting WebApp initialization');

    // Check if we're in development mode
    if (import.meta.env.DEV) {
      debugLog('Development mode - skipping WebApp initialization');
      return;
    }

    // Perform initial checks and wait for WebApp to be ready
    await performInitialChecks();

    // Get WebApp instance
    const webApp = window.Telegram?.WebApp;
    if (!webApp) {
      throw new WebAppError('Telegram WebApp not available');
    }

    // Configure WebApp
    configureWebApp(webApp);

    debugLog('WebApp initialization completed successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to initialize WebApp';
    debugLog('WebApp initialization failed:', errorMessage);
    throw new WebAppError(errorMessage);
  }
};