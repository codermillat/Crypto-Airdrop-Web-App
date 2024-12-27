import { getEnvConfig } from './environment';

export const getTelegramConfig = () => {
  const { telegramBotToken, telegramBotUsername, siteUrl } = getEnvConfig();
  
  return {
    botToken: telegramBotToken,
    botUsername: telegramBotUsername,
    webAppUrl: siteUrl,
    manifestUrl: `${siteUrl}/tonconnect-manifest.json`
  };
};