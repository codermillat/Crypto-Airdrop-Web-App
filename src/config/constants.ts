export const ENV_DEFAULTS = {
  apiUrl: 'http://localhost:3000',
  siteUrl: 'http://localhost:5173',
  appUrl: 'http://localhost:5173',
  botToken: 'default_bot_token',
  botUsername: 'default_bot_username',
  isDebug: true
} as const;

export const REQUIRED_ENV_VARS = [
  'VITE_API_URL',
  'VITE_SITE_URL',
  'VITE_TELEGRAM_BOT_TOKEN',
  'VITE_TELEGRAM_BOT_USERNAME'
] as const;