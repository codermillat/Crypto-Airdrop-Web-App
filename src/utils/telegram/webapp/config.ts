import { debugLog } from '../debug';
import { WebAppError } from './errors';
import { updateWebAppState } from './state';

interface ConfigOptions {
  expandView?: boolean;
  enableClosingConfirmation?: boolean;
  headerColor?: string;
  backgroundColor?: string;
  enableHapticFeedback?: boolean;
}

const DEFAULT_CONFIG: ConfigOptions = {
  expandView: true,
  enableClosingConfirmation: true,
  headerColor: '#000000',
  backgroundColor: '#000000',
  enableHapticFeedback: true
};

export const configureWebApp = (
  webApp: any, 
  options: ConfigOptions = DEFAULT_CONFIG
): void => {
  try {
    debugLog('Configuring WebApp with options:', options);

    if (options.expandView) {
      webApp.expand();
    }

    if (options.enableClosingConfirmation && webApp.enableClosingConfirmation) {
      webApp.enableClosingConfirmation();
    }

    if (options.headerColor && webApp.setHeaderColor) {
      webApp.setHeaderColor(options.headerColor);
    }

    if (options.backgroundColor && webApp.setBackgroundColor) {
      webApp.setBackgroundColor(options.backgroundColor);
    }

    if (options.enableHapticFeedback && webApp.HapticFeedback) {
      webApp.HapticFeedback.notificationOccurred('success');
    }

    webApp.ready();
    
    updateWebAppState({ 
      isConfigured: true,
      platform: webApp.platform,
      colorScheme: webApp.colorScheme
    });

    debugLog('WebApp configuration completed successfully');
  } catch (error) {
    const message = 'Failed to configure WebApp';
    debugLog(message, error);
    throw new WebAppError(message);
  }
};