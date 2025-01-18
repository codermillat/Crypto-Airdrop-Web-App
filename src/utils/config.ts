import { isDevelopment } from './validation';

const DEFAULT_DEV_CONFIG = {
  apiUrl: 'http://localhost:3000',
  siteUrl: 'http://localhost:5173',
  isDebug: true
};

export const getConfig = () => {
  // In development, use default values if env vars are not set
  if (isDevelopment()) {
    return {
      apiUrl: import.meta.env.VITE_API_URL || DEFAULT_DEV_CONFIG.apiUrl,
      siteUrl: import.meta.env.VITE_SITE_URL || DEFAULT_DEV_CONFIG.siteUrl,
      isDebug: import.meta.env.VITE_DEBUG_MODE === 'true' || DEFAULT_DEV_CONFIG.isDebug
    };
  }

  return {
    apiUrl: import.meta.env.VITE_API_URL,
    siteUrl: import.meta.env.VITE_SITE_URL,
    isDebug: import.meta.env.VITE_DEBUG_MODE === 'true'
  };
};