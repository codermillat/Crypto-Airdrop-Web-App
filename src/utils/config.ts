export const getTelegramConfig = () => {
  const config = {
    botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME,
    apiUrl: import.meta.env.VITE_API_URL,
    appUrl: import.meta.env.VITE_APP_URL,
    isDebug: import.meta.env.VITE_DEBUG_MODE === 'true'
  };

  // Validate required configuration
  if (!config.botToken) {
    throw new Error('VITE_TELEGRAM_BOT_TOKEN is required');
  }

  if (!config.botUsername) {
    throw new Error('VITE_TELEGRAM_BOT_USERNAME is required');
  }

  return config;
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
