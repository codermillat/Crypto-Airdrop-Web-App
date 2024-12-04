import axios from 'axios';

const BOT_TOKEN = '7395999208:AAHD-3nVoIWFDF1uAGOWGCTmmMut4J2AXzM';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user?: TelegramUser;
    auth_date: number;
    hash: string;
  };
  platform?: string;
  colorScheme?: string;
  themeParams?: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  isExpanded?: boolean;
  viewportHeight?: number;
  viewportStableHeight?: number;
  isClosingConfirmationEnabled?: boolean;
  headerColor?: string;
  backgroundColor?: string;
  BackButton?: {
    isVisible: boolean;
  };
  MainButton?: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
  };
  HapticFeedback?: {
    impactOccurred: (style: string) => void;
    notificationOccurred: (type: string) => void;
    selectionChanged: () => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const isTelegramWebApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if we're in Telegram Mini App
  if (window.Telegram?.WebApp) {
    return true;
  }

  // Check if we're in Telegram's in-app browser
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('telegram') || userAgent.includes('tgweb')) {
    return true;
  }

  // Check for Telegram-specific URL parameters
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
    // Enable viewport tracking
    window.Telegram.WebApp.expand();
    
    // Set app header color
    window.Telegram.WebApp.setHeaderColor('#000000');
    
    // Set background color
    window.Telegram.WebApp.setBackgroundColor('#000000');
    
    // Ready event
    window.Telegram.WebApp.ready();
  }
};