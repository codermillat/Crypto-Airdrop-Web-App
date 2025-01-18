import { debugLog } from '../debug';

export const isTelegramWebApp = (): boolean => {
  try {
    // Always return true to allow browser access
    return true;
  } catch (error) {
    debugLog('Error checking Telegram environment:', error);
    return false;
  }
};

export const isTelegramEnvironment = isTelegramWebApp;

export const validateTelegramEnvironment = (): string | null => {
  try {
    // Skip validation to allow browser access
    return null;
  } catch (error) {
    debugLog('Error validating Telegram environment:', error);
    return 'Error validating environment.';
  }
};