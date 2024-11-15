import axios from 'axios';
import { handleApiError } from './error';

const BASE_URL = 'https://crypto-airdrop-web-app.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 15000
});

// Add wallet address and telegram info to requests
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (!address) {
    return Promise.reject(new Error('Wallet not connected'));
  }
  
  config.headers.address = address;
  const telegramId = localStorage.getItem('telegram_id');
  if (telegramId) {
    config.headers['x-telegram-id'] = telegramId;
  }
  
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('wallet_address');
      localStorage.removeItem('telegram_id');
      window.location.href = '/';
    }
    return Promise.reject(handleApiError(error));
  }
);

// Enhanced retry logic with exponential backoff
const withRetry = async (fn: () => Promise<any>, maxRetries = 3) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (retries === maxRetries) {
        throw error;
      }
      
      // Exponential backoff with jitter
      const delay = Math.min(1000 * Math.pow(2, retries) + Math.random() * 1000, 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// API endpoints with proper error handling
export const fetchUser = async () => {
  try {
    const response = await withRetry(() => api.get('/user'));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await withRetry(() => api.get('/tasks'));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const claimReward = async (taskId: string) => {
  try {
    const response = await withRetry(() => api.post('/claim-reward', { taskId }));
    return response.data;
  } catch (error) {
    console.error('Failed to claim reward:', error);
    throw error;
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await withRetry(() => api.get('/leaderboard'));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    throw error;
  }
};

export const submitReferral = async (referralCode: string) => {
  try {
    const response = await withRetry(() => api.post('/referral', { referralCode }));
    return response.data;
  } catch (error) {
    console.error('Failed to submit referral:', error);
    throw error;
  }
};

export const fetchReferrals = async () => {
  try {
    const response = await withRetry(() => api.get('/referrals'));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch referrals:', error);
    throw error;
  }
};

export const fetchRewards = async () => {
  try {
    const response = await withRetry(() => api.get('/rewards'));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch rewards:', error);
    throw error;
  }
};

export const claimDailyReward = async () => {
  try {
    const response = await withRetry(() => api.post('/rewards/daily/claim'));
    return response.data;
  } catch (error) {
    console.error('Failed to claim daily reward:', error);
    throw error;
  }
};

export const registerUser = async (username: string) => {
  try {
    const response = await withRetry(() => api.post('/register', { username }));
    return response.data;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};

export const getReferralCode = async () => {
  try {
    const response = await withRetry(() => api.get('/referral-code'));
    return response.data;
  } catch (error) {
    console.error('Failed to get referral code:', error);
    throw error;
  }
};

export default api;