import { getEnvironment } from './environment';

interface Config {
  botToken: string;
  botUsername: string;
  apiUrl: string;
  siteUrl: string;
  isDebug: boolean;
}

const DEFAULT_DEV_CONFIG: Config = {
  botToken: '7395999208:AAHD-3nVoIWFDF1uAGOWGCTmmMut4J2AXzM',
  botUsername: 'TonFunZoneBot',
  apiUrl: 'http://localhost:3000',
  siteUrl: 'http://localhost:5173',
  isDebug: true
};

export const getConfig = (): Config => {
  const { isDevelopment, baseUrl } = getEnvironment();

  if (isDevelopment) {
    return {
      botToken: process.env.VITE_TELEGRAM_BOT_TOKEN || DEFAULT_DEV_CONFIG.botToken,
      botUsername: process.env.VITE_TELEGRAM_BOT_USERNAME || DEFAULT_DEV_CONFIG.botUsername,
      apiUrl: process.env.VITE_API_URL || DEFAULT_DEV_CONFIG.apiUrl,
      siteUrl: baseUrl || DEFAULT_DEV_CONFIG.siteUrl,
      isDebug: process.env.VITE_DEBUG_MODE === 'true' || DEFAULT_DEV_CONFIG.isDebug
    };
  }

  return {
    botToken: process.env.VITE_TELEGRAM_BOT_TOKEN || '',
    botUsername: process.env.VITE_TELEGRAM_BOT_USERNAME || '',
    apiUrl: process.env.VITE_API_URL || '',
    siteUrl: baseUrl,
    isDebug: process.env.VITE_DEBUG_MODE === 'true'
  };
};
