// Handles environment detection and validation
export const isTelegramEnvironment = (): boolean => {
  // Check WebApp API
  if (window.Telegram?.WebApp) {
    return true;
  }

  // Check URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('tgWebAppData') || searchParams.has('tgWebAppStartParam')) {
    return true;
  }

  // Check user agent
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('telegram') || userAgent.includes('tgweb');
};

export const getEnvironmentInfo = () => ({
  isTelegram: isTelegramEnvironment(),
  platform: window.Telegram?.WebApp?.platform || 'unknown',
  version: window.Telegram?.WebApp?.version || 'unknown'
});