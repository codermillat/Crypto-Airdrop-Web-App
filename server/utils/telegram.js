import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const getTelegramUser = async (userId) => {
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

export const sendMessage = async (chatId, text) => {
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