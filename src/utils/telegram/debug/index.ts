export interface DebugInfo {
  hasWebApp: boolean;
  webAppData: any;
  userAgent: string;
  urlParams: string;
  platform: string;
  hasProxy: boolean;
}

export const debugLog = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Telegram Debug] ${message}`, ...args);
  }
};

export const debugTelegramEnvironment = (): DebugInfo => {
  const info: DebugInfo = {
    hasWebApp: !!window.Telegram?.WebApp,
    webAppData: window.Telegram?.WebApp?.initData,
    userAgent: navigator.userAgent,
    urlParams: window.location.search,
    platform: window.Telegram?.WebApp?.platform || 'unknown',
    hasProxy: 'TelegramWebviewProxy' in window
  };
  
  debugLog('Environment Debug:', info);
  return info;
};