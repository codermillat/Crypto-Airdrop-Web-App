import axios from 'axios';
import { handleApiError } from './error';

const BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD 
    ? 'https://paws-crypto-api.onrender.com/api'
    : 'http://localhost:3000/api'
);

const api = axios.create({
  baseURL: BASE_URL,
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
  
  if (import.meta.env.DEV) {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
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
  return api.get('/data/referral-code');
};

export const submitReferral = async (referralCode: string) => {
  return api.post('/data/referral', { referralCode });
};

export const fetchReferrals = async () => {
  return api.get('/user/referrals');
};

export const fetchAllData = async () => {
  return api.get('/data/all');
};

export default api;