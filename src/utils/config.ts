import { isValidUrl } from './validation';

export const getManifestUrl = (): `${string}://${string}` => {
  const baseUrl = window.location.origin;
  const manifestPath = '/tonconnect-manifest.json';
  const fullUrl = `${baseUrl}${manifestPath}`;

  if (!isValidUrl(fullUrl)) {
    throw new Error('Invalid manifest URL');
  }

  return fullUrl as `${string}://${string}`;
};

export const getTelegramBotUsername = (): string => {
  return import.meta.env.VITE_TELEGRAM_BOT_USERNAME || '';
};

export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || '/api';
};