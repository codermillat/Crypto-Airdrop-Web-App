import { TELEGRAM_URL_PARAMS } from './constants';
import { debugLog } from '../debug';

export const hasWebAppParams = (): boolean => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    return TELEGRAM_URL_PARAMS.some(param => searchParams.has(param));
  } catch (error) {
    debugLog('Error checking URL params:', error);
    return false;
  }
};