import { debugLog } from '../debug';
import { performInitialChecks } from './initialization/checks';
import { configureWebApp } from './initialization/config';
import { WebAppError } from './errors';

export const initializeWebApp = async (): Promise<void> => {
  try {
    debugLog('Starting WebApp initialization');

    // Skip initialization for browser access
    if (!window.Telegram?.WebApp) {
      debugLog('Browser environment detected - skipping WebApp initialization');
      return;
    }

    // Only proceed with Telegram-specific initialization if in Telegram
    await performInitialChecks();
    
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      configureWebApp(webApp);
    }

    debugLog('WebApp initialization completed successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to initialize WebApp';
    debugLog('WebApp initialization failed:', errorMessage);
    // Don't throw error to allow browser access
    console.warn(errorMessage);
  }
};