import axios from 'axios';
import { handleApiError } from './error';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 30000
});

// Request interceptor
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers['x-wallet-address'] = address;
    config.headers.Authorization = `Bearer ${address}`;
  }
  return config;
}, (error) => {
  return Promise.reject(handleApiError(error));
});

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (!error.response) {
      return Promise.reject(handleApiError(new Error('Network error. Please check your connection.')));
    }

    if (error.response.status === 404) {
      return Promise.reject(handleApiError(new Error('Resource not found. Please try again later.')));
    }

    if (error.response.status === 401) {
      localStorage.removeItem('wallet_address');
      window.location.href = '/';
      return Promise.reject(handleApiError(new Error('Please connect your wallet')));
    }

    const errorMessage = error.response.data?.error || error.message;
    return Promise.reject(handleApiError(new Error(errorMessage)));
  }
);

// Auth endpoints
export const registerWallet = (address: string) => 
  api.post('/auth/wallet', { address });

export const registerUser = (username: string, telegramId?: string) => 
  api.post('/auth/register', { username, telegramId });

// User endpoints
export const fetchUser = () => api.get('/user');
export const fetchTasks = () => api.get('/user/tasks');
export const claimReward = (taskId: string) => api.post('/user/claim-reward', { taskId });

// Data endpoints
export const fetchLeaderboard = () => api.get('/data/leaderboard');
export const submitReferral = (referralCode: string) => api.post('/data/referral', { referralCode });
export const getReferralCode = () => api.get('/data/referral-code');
export const fetchAllData = () => api.get('/data/all');

export default api;