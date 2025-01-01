interface EnvConfig {
  apiUrl: string;
  siteUrl: string;
  appUrl: string;
  botToken: string;
  botUsername: string;
  isDebug: boolean;
}

const validateEnv = (): void => {
  const required = [
    'VITE_API_URL',
    'VITE_SITE_URL',
    'VITE_TELEGRAM_BOT_TOKEN',
    'VITE_TELEGRAM_BOT_USERNAME'
  ];

  const missing = required.filter(key => !import.meta.env[key]);
  if (missing.length > 0) {
    console.warn(`Missing optional environment variables: ${missing.join(', ')}`);
  }
};

export const getEnvironmentConfig = (): EnvConfig => {
  validateEnv();

  // Default values for development
  const defaults = {
    apiUrl: 'http://localhost:3000',
    siteUrl: 'http://localhost:5173',
    appUrl: 'http://localhost:5173',
    botToken: 'default_bot_token',
    botUsername: 'default_bot_username',
    isDebug: true
  };

  return {
    apiUrl: import.meta.env.VITE_API_URL || defaults.apiUrl,
    siteUrl: import.meta.env.VITE_SITE_URL || defaults.siteUrl,
    appUrl: import.meta.env.VITE_SITE_URL || defaults.appUrl, // Use SITE_URL as fallback for APP_URL
    botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || defaults.botToken,
    botUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || defaults.botUsername,
    isDebug: import.meta.env.VITE_DEBUG_MODE === 'true' || defaults.isDebug
  };
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

export const isProduction = (): boolean => {
  return import.meta.env.PROD;
};