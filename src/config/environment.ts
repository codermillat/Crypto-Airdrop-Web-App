import { EnvConfig } from './types';
import { ENV_DEFAULTS } from './constants';
import { validateEnv } from './validation';

export const getEnvironmentConfig = (): EnvConfig => {
  validateEnv();

  return {
    apiUrl: import.meta.env.VITE_API_URL || ENV_DEFAULTS.apiUrl,
    siteUrl: import.meta.env.VITE_SITE_URL || ENV_DEFAULTS.siteUrl,
    appUrl: import.meta.env.VITE_SITE_URL || ENV_DEFAULTS.appUrl,
    botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || ENV_DEFAULTS.botToken,
    botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || ENV_DEFAULTS.botUsername,
    isDebug: import.meta.env.VITE_DEBUG_MODE === 'true' || ENV_DEFAULTS.isDebug
  };
};

export const isDevelopment = (): boolean => import.meta.env.DEV;
export const isProduction = (): boolean => import.meta.env.PROD;