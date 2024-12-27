import api from './client';

export const registerUser = async (username: string, telegramId: string) => {
  const response = await api.post('/auth/register', { 
    username, 
    telegramId,
    useTelegramUsername: true 
  });
  return response.data;
};

export const registerWallet = async (address: string) => {
  const response = await api.post('/auth/wallet', { address });
  return response.data;
};

export const fetchUser = async () => {
  const response = await api.get('/user');
  return response.data;
};