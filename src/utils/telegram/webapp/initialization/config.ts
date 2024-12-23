import { debugLog } from '../../debug';

export const configureWebApp = (webApp: any): void => {
  debugLog('Configuring WebApp');

  // Expand view
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
  
  debugLog('WebApp configuration completed');
};