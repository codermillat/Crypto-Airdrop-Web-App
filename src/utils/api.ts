import axios from 'axios';
import { handleApiError } from './error';

interface WalletData {
  address: string | null;
  // Add other properties as needed based on the API response
}

interface UserData {
  points: number | null;
  username: string | null;
  referralCode: string | null;
  // Add other properties as needed based on the API response
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
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

  // Log request in development
  if (import.meta.env.DEV) {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
  }

  return config;
}, (error) => {
  return Promise.reject(handleApiError(error));
});

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data
      });
    }
    return Promise.reject(handleApiError(error));
  }
);

// API functions
export const registerWallet = async (address: string): Promise<WalletData> => {
  return api.post('/auth/wallet', { address });
};

export const registerUser = async (username: string, telegramId: string) => {
  return api.post('/auth/register', {
    username,
    telegramId,
    useTelegramUsername: true // New flag to enforce Telegram username
  });
};

export const fetchUser = async (): Promise<UserData> => {
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
