// Handles environment detection and validation
export const isTelegramEnvironment = (): boolean => {
  try {
    // Check WebApp API
    if (window.Telegram?.WebApp) {
      return true;
    }

    // Check URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    if (
      searchParams.has('tgWebAppData') || 
      searchParams.has('tgWebAppStartParam') ||
      searchParams.has('tgWebAppPlatform')
    ) {
      return true;
    }

    // Check user agent
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('telegram') || userAgent.includes('tgweb')) {
      return true;
    }

    // Check referrer
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('telegram.org') || referrer.includes('t.me')) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking Telegram environment:', error);
    return false;
  }
};

export const getEnvironmentInfo = () => ({
  isTelegram: isTelegramEnvironment(),
  platform: window.Telegram?.WebApp?.platform || 'unknown',
  version: window.Telegram?.WebApp?.version || 'unknown',
  initData: window.Telegram?.WebApp?.initData || null
});