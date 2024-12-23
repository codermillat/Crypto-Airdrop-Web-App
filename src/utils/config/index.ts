import { isDevelopment } from '../validation';

interface Config {
  botToken: string;
  botUsername: string;
  apiUrl: string;
  siteUrl: string;
  isDebug: boolean;
}

const DEFAULT_DEV_CONFIG: Config = {
  botToken: '0000000000:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  botUsername: 'TonFunZoneBot',
  apiUrl: 'http://localhost:3000',
  siteUrl: 'http://localhost:5173',
  isDebug: true
};

export const getConfig = (): Config => {
  // In development, use default values if env vars are not set
  if (isDevelopment()) {
    return {
      botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || DEFAULT_DEV_CONFIG.botToken,
      botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || DEFAULT_DEV_CONFIG.botUsername,
      apiUrl: import.meta.env.VITE_API_URL || DEFAULT_DEV_CONFIG.apiUrl,
      siteUrl: import.meta.env.VITE_SITE_URL || DEFAULT_DEV_CONFIG.siteUrl,
      isDebug: import.meta.env.VITE_DEBUG_MODE === 'true' || DEFAULT_DEV_CONFIG.isDebug
    };
  }

  // In production, require environment variables
  if (!import.meta.env.VITE_TELEGRAM_BOT_TOKEN) {
    throw new Error('VITE_TELEGRAM_BOT_TOKEN is required in production');
  }

  if (!import.meta.env.VITE_TELEGRAM_BOT_USERNAME) {
    throw new Error('VITE_TELEGRAM_BOT_USERNAME is required in production');
  }

  return {
    botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME,
    apiUrl: import.meta.env.VITE_API_URL,
    siteUrl: import.meta.env.VITE_SITE_URL,
    isDebug: import.meta.env.VITE_DEBUG_MODE === 'true'
  };
};

export * from './manifest';