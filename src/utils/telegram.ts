import axios from 'axios';

const BOT_TOKEN = '7395999208:AAHD-3nVoIWFDF1uAGOWGCTmmMut4J2AXzM';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    auth_date: number;
    hash: string;
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
  return (
    typeof window !== 'undefined' &&
    window.Telegram?.WebApp !== undefined
  );
};

export const getTelegramUser = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/getChat`, {
      params: { chat_id: userId }
    });
    return response.data.result;
  } catch (error) {
    console.error('Failed to get Telegram user:', error);
    return null;
  }
};

export const sendMessage = async (chatId: string, text: string) => {
  try {
    await axios.post(`${API_URL}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

export const getTelegramWebAppUser = (): {
  id: number;
  username?: string;
} | null => {
  if (!isTelegramWebApp()) return null;
  return window.Telegram?.WebApp.initDataUnsafe.user || null;
};