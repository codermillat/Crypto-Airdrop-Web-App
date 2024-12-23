import axios from 'axios';
import { getConfig } from './config';
import { handleApiError } from './error';

const { apiUrl } = getConfig();

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 15000
});

// Request interceptor to add wallet address header
api.interceptors.request.use(config => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers['x-wallet-address'] = address;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    throw handleApiError(error);
  }
);

// Auth endpoints
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

// Task endpoints
export const fetchTasks = async () => {
  const response = await api.get('/user/tasks');
  return response.data;
};

export const claimReward = async (taskId: string) => {
  const response = await api.post('/user/claim-reward', { taskId });
  return response.data;
};

// Referral endpoints
export const getReferralCode = async () => {
  const response = await api.get('/user/referral-code');
  return response.data;
};

export const submitReferral = async (referralCode: string) => {
  const response = await api.post('/user/referral', { referralCode });
  return response.data;
};

// Leaderboard endpoints
export const fetchLeaderboard = async () => {
  const response = await api.get('/data/leaderboard');
  return response.data;
};

// Referrals list
export const fetchReferrals = async () => {
  const response = await api.get('/user/referrals');
  return response.data;
};

// Admin endpoints
export const fetchAllData = async () => {
  const response = await api.get('/data/all');
  return response.data;
};

export default api;