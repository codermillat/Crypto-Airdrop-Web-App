import { TelegramWebApp } from '../../types/telegram';

export const getPlatformInfo = () => {
  const webApp = window.Telegram?.WebApp;
  
  return {
    platform: webApp?.platform || 'unknown',
    version: webApp?.version || 'unknown',
    colorScheme: webApp?.colorScheme || 'dark',
    isExpanded: webApp?.isExpanded || false,
    viewportHeight: webApp?.viewportHeight || window.innerHeight,
    viewportStableHeight: webApp?.viewportStableHeight || window.innerHeight
  };
};

export const isWebViewPlatform = (): boolean => {
  const { platform } = getPlatformInfo();
  return ['ios', 'android', 'weba', 'tdesktop'].includes(platform);
};

export const isMobilePlatform = (): boolean => {
  const { platform } = getPlatformInfo();
  return ['ios', 'android'].includes(platform);
};