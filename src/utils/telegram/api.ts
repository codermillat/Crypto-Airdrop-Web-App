import axios from 'axios';
import { TelegramMessage } from './types';
import { handleApiError } from '../error';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(handleApiError(error))
);

export const sendMessage = async (chatId: number, text: string, options?: {
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
}): Promise<TelegramMessage> => {
  return api.post('/sendMessage', {
    chat_id: chatId,
    text,
    ...options
  });
};

export const getChatMember = async (chatId: number, userId: number) => {
  return api.get('/getChatMember', {
    params: {
      chat_id: chatId,
      user_id: userId
    }
  });
};

export const getChat = async (chatId: number) => {
  return api.get('/getChat', {
    params: { chat_id: chatId }
  });
};

export const setWebhook = async (url: string, options?: {
  certificate?: File;
  ip_address?: string;
  max_connections?: number;
  allowed_updates?: string[];
  drop_pending_updates?: boolean;
  secret_token?: string;
}) => {
  return api.post('/setWebhook', {
    url,
    ...options
  });
};

export const deleteWebhook = async (drop_pending_updates = false) => {
  return api.post('/deleteWebhook', { drop_pending_updates });
};

export const getWebhookInfo = async () => {
  return api.get('/getWebhookInfo');
};
