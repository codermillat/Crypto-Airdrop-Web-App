// Environment variable types
interface EnvConfig {
  apiUrl: string;
  debugMode: boolean;
  telegramBotToken: string;
  telegramBotUsername: string;
  siteUrl: string;
  appUrl: string;
  nodeEnv: string;
}

// Validate required environment variables
const validateEnv = (): void => {
  const required = [
    'VITE_API_URL',
    'VITE_TELEGRAM_BOT_TOKEN',
    'VITE_TELEGRAM_BOT_USERNAME',
    'VITE_SITE_URL',
    'VITE_APP_URL'
  ];

  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Get environment configuration
export const getEnvConfig = (): EnvConfig => {
  validateEnv();

  return {
    apiUrl: import.meta.env.VITE_API_URL,
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    telegramBotToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    telegramBotUsername: import.meta.env.VITE_TELEGRAM_BOT_USERNAME,
    siteUrl: import.meta.env.VITE_SITE_URL,
    appUrl: import.meta.env.VITE_APP_URL,
    nodeEnv: import.meta.env.NODE_ENV
  };
};