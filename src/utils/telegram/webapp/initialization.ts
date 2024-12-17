import { debugLog } from '../debug';
import { WebAppError } from './errors';
import { validatePlatform } from './detection';
import { configureWebApp } from './config';
import { updateWebAppState, resetWebAppState } from './state';

const INIT_TIMEOUT = 5000; // 5 seconds
const RETRY_INTERVAL = 500; // 0.5 seconds

export const initializeWebApp = async (): Promise<void> => {
  try {
    debugLog('Starting WebApp initialization');
    resetWebAppState();

    // Wait for WebApp to be available
    const webApp = await waitForWebApp();
    if (!webApp) {
      throw new WebAppError('WebApp not available after timeout');
    }

    // Validate platform
    const { isValid, error } = validatePlatform();
    if (!isValid) {
      throw new WebAppError(error || 'Invalid platform');
    }

    // Configure WebApp
    await configureWebApp(webApp);

    updateWebAppState({ 
      isInitialized: true,
      error: null
    });

    debugLog('WebApp initialization completed successfully');
  } catch (error) {
    const message = error instanceof WebAppError 
      ? error.message 
      : 'Failed to initialize WebApp';
    
    updateWebAppState({ 
      isInitialized: false,
      error: message
    });

    debugLog('WebApp initialization failed:', error);
    throw new WebAppError(message);
  }
};

const waitForWebApp = async (): Promise<any> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < INIT_TIMEOUT) {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      debugLog('WebApp found');
      return webApp;
    }
    await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
    debugLog('Waiting for WebApp...');
  }
  
  return null;
};