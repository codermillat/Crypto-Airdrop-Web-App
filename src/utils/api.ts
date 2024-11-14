import axios from 'axios';
import { handleApiError } from './error';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://paws-crypto-api.onrender.com/api'
    : 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 10000 // 10 second timeout
});

// Add wallet address and telegram info to requests
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  const telegramId = localStorage.getItem('telegram_id');
  
  if (address) {
    config.headers.address = address;
  }
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

// Retry failed requests
const withRetry = async (fn: () => Promise<any>, retries = 2) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error) && error.response?.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return withRetry(fn, retries - 1);
    }
    throw error;
  }
};

export const fetchUser = () => 
  withRetry(() => api.get('/user')).then(res => res.data);

export const fetchTasks = () => 
  withRetry(() => api.get('/tasks')).then(res => res.data);

export const claimReward = (taskId: string) => 
  withRetry(() => api.post('/claim-reward', { taskId })).then(res => res.data);

export const fetchLeaderboard = () => 
  withRetry(() => api.get('/leaderboard')).then(res => res.data);

export const submitReferral = (referralCode: string) => 
  withRetry(() => api.post('/referral', { referralCode })).then(res => res.data);

export const fetchReferrals = () => 
  withRetry(() => api.get('/referrals')).then(res => res.data);

export const fetchRewards = () => 
  withRetry(() => api.get('/rewards')).then(res => res.data);

export const claimDailyReward = () => 
  withRetry(() => api.post('/rewards/daily/claim')).then(res => res.data);

export const registerUser = (username: string) => 
  withRetry(() => api.post('/register', { username })).then(res => res.data);

export const getReferralCode = () => 
  withRetry(() => api.get('/referral-code')).then(res => res.data);

export default api;