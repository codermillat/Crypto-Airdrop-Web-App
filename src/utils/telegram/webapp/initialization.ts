import { getWebApp, waitForWebApp } from './core';
import { WebAppError } from './errors';
import { isTelegramEnvironment } from '../environment/detection';
import { debugTelegramEnvironment } from '../debug';
import { configureWebApp } from './config';

const INIT_TIMEOUT = 5000;

export const initializeWebApp = async (): Promise<void> => {
  try {
    debugTelegramEnvironment();

    if (!isTelegramEnvironment()) {
      throw new WebAppError('Please open the app in Telegram');
    }

    const webApp = await waitForWebApp(INIT_TIMEOUT);
    const configured = configureWebApp(webApp);

    if (!configured) {
      debugLog('WebApp configuration incomplete');
    }

    debugLog('WebApp initialized successfully');
  } catch (error) {
    debugLog('WebApp initialization failed:', error);
    throw error instanceof WebAppError ? error : new WebAppError('Failed to initialize WebApp');
  }
};