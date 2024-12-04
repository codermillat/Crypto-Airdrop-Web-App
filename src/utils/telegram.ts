import { TelegramUser, TelegramWebApp } from '../types/telegram';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const isTelegramWebApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (window.Telegram?.WebApp) {
    return true;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('telegram') || userAgent.includes('tgweb')) {
    return true;
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('tgWebAppStartParam') || urlParams.has('tgWebAppData')) {
    return true;
  }

  return false;
};

export const getTelegramWebAppUser = (): TelegramUser | null => {
  if (!isTelegramWebApp()) return null;
  return window.Telegram?.WebApp.initDataUnsafe.user || null;
};

export const validateTelegramUser = (user: TelegramUser | null): boolean => {
  if (!user) return false;
  if (!user.username) return false;
  return true;
};

export const getTelegramUsername = (): string | null => {
  const user = getTelegramWebAppUser();
  return user?.username || null;
};

export const getTelegramPlatform = (): string => {
  if (!window.Telegram?.WebApp) return 'unknown';
  return window.Telegram.WebApp.platform || 'unknown';
};

export const initializeTelegramWebApp = (): void => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.setHeaderColor('#000000');
    window.Telegram.WebApp.setBackgroundColor('#000000');
    window.Telegram.WebApp.ready();
  }
};