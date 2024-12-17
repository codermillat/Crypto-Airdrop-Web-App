import { isTelegramEnvironment } from './detection';

export interface EnvironmentInfo {
  isTelegram: boolean;
  platform: string;
  version: string;
  initData: string | null;
  userAgent: string;
  searchParams: string;
}

export const getEnvironmentInfo = (): EnvironmentInfo => ({
  isTelegram: isTelegramEnvironment(),
  platform: window.Telegram?.WebApp?.platform || 'unknown',
  version: window.Telegram?.WebApp?.version || 'unknown',
  initData: window.Telegram?.WebApp?.initData || null,
  userAgent: navigator.userAgent,
  searchParams: window.location.search
});