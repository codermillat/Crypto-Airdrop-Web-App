import { isDevelopment } from './validation';

const DEFAULT_DEV_CONFIG = {
  botToken: '0000000000:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  botUsername: 'your_bot_username',
  apiUrl: 'http://localhost:3000',
  appUrl: 'http://localhost:5173',
  isDebug: true
};

export const getTelegramConfig = () => {
  // In development, use default values if env vars are not set
  if (isDevelopment()) {
    return {
      botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || DEFAULT_DEV_CONFIG.botToken,
      botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || DEFAULT_DEV_CONFIG.botUsername,
      apiUrl: import.meta.env.VITE_API_URL || DEFAULT_DEV_CONFIG.apiUrl,
      appUrl: import.meta.env.VITE_APP_URL || DEFAULT_DEV_CONFIG.appUrl,
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
    appUrl: import.meta.env.VITE_APP_URL,
    isDebug: import.meta.env.VITE_DEBUG_MODE === 'true'
  };
};

export const getManifestUrl = (): string => {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  return `${baseUrl}/tonconnect-manifest.json`;
};

export const isProduction = (): boolean => {
  return import.meta.env.PROD;
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

export const getTelegramBotUsername = (): string => {
  const { botUsername } = getTelegramConfig();
  return botUsername;
};