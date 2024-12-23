import { debugLog } from '../debug';
import { isTelegramWebApp } from '../detection/webapp';
import { waitForWebApp } from './core';
import { isMacOSClient } from '../detection/platform';

const initializeMacOSWebApp = async (): Promise<void> => {
  debugLog('Initializing MacOS WebApp');
  // MacOS specific initialization if needed
  // For now, we just consider it initialized
  return Promise.resolve();
};

export const initializeWebApp = async (): Promise<void> => {
  try {
    debugLog('Starting WebApp initialization');

    // Environment check
    if (!isTelegramWebApp()) {
      throw new Error('Please open the app in Telegram');
    }

    // Special handling for MacOS client
    if (isMacOSClient()) {
      return initializeMacOSWebApp();
    }

    // Wait for WebApp
    const webApp = await waitForWebApp();

    // Configure WebApp
    debugLog('Configuring WebApp');
    webApp.expand();

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
    debugLog('WebApp initialization completed');
  } catch (error) {
    debugLog('WebApp initialization failed:', error);
    throw error;
  }
};