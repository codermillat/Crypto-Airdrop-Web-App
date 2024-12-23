import { TELEGRAM_PLATFORMS } from './constants';

export const getPlatform = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = window.Telegram?.WebApp?.platform?.toLowerCase() || '';

  if (platform) {
    return platform;
  }

  if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) {
    return TELEGRAM_PLATFORMS.MACOS;
  }

  if (userAgent.includes('android')) {
    return TELEGRAM_PLATFORMS.ANDROID;
  }

  if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    return TELEGRAM_PLATFORMS.IOS;
  }

  return TELEGRAM_PLATFORMS.UNKNOWN;
};

export const isMacOSClient = (): boolean => {
  return getPlatform() === TELEGRAM_PLATFORMS.MACOS;
};