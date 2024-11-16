import axios from 'axios';
import { handleApiError } from './error';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 15000
});

// Request interceptor
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers['x-wallet-address'] = address;
  }
  return config;
}, (error) => {
  return Promise.reject(handleApiError(error));
});

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(handleApiError(error))
);

// API functions
export const registerWallet = async (address: string) => {
  return api.post('/auth/wallet', { address });
};

export const registerUser = async (username: string, telegramId?: string) => {
  return api.post('/auth/register', { username, telegramId });
};

export const fetchUser = async () => {
  return api.get('/user');
};

export const fetchTasks = async () => {
  return api.get('/user/tasks');
};

export const claimReward = async (taskId: string) => {
  return api.post('/user/claim-reward', { taskId });
};

export const fetchLeaderboard = async () => {
  return api.get('/data/leaderboard');
};

export const getReferralCode = async () => {
  return api.get('/user/referral-code');
};

export const submitReferral = async (referralCode: string) => {
  return api.post('/user/referral', { referralCode });
};

export const fetchReferrals = async () => {
  return api.get('/user/referrals');
};

export const fetchAllData = async () => {
  return api.get('/data/all');
};

export default api;