import { TelegramUser, TelegramWebApp } from '../types/telegram';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

export const getTelegramBotUsername = (): string => {
  return BOT_USERNAME;
};

export const isTelegramWebApp = (): boolean => {
  try {
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
  } catch (error) {
    console.error('Error checking Telegram WebApp:', error);
    return false;
  }
};

export const getTelegramWebAppUser = (): TelegramUser | null => {
  try {
    if (!isTelegramWebApp()) return null;
    const user = window.Telegram?.WebApp.initDataUnsafe.user;
    if (!user) {
      console.warn('No user data found in Telegram WebApp');
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

export const validateTelegramUser = (user: TelegramUser | null): boolean => {
  try {
    if (!user) {
      console.warn('No user provided for validation');
      return false;
    }
    if (!user.username) {
      console.warn('User has no username');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error validating Telegram user:', error);
    return false;
  }
};

export const getTelegramUsername = (): string | null => {
  try {
    const user = getTelegramWebAppUser();
    return user?.username || null;
  } catch (error) {
    console.error('Error getting Telegram username:', error);
    return null;
  }
};

export const getTelegramPlatform = (): string => {
  try {
    if (!window.Telegram?.WebApp) return 'unknown';
    return window.Telegram.WebApp.platform || 'unknown';
  } catch (error) {
    console.error('Error getting Telegram platform:', error);
    return 'unknown';
  }
};

export const initializeTelegramWebApp = (): void => {
  try {
    if (!window.Telegram?.WebApp) {
      console.warn('Telegram WebApp not available');
      return;
    }

    window.Telegram.WebApp.isExpanded = true;
    window.Telegram.WebApp.headerColor = '#000000';
    window.Telegram.WebApp.backgroundColor = '#000000';
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
  }
};
