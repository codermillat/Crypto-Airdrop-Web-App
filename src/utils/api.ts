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
    config.headers.address = address;
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
    if (!error.response) {
      return Promise.reject(handleApiError(new Error('Network error. Please check your connection.')));
    }

    if (error.response.status === 404) {
      return Promise.reject(handleApiError(new Error('Resource not found')));
    }

    if (error.response.status === 401) {
      localStorage.removeItem('wallet_address');
      return Promise.reject(handleApiError(new Error('Please connect your wallet')));
    }

    if (error.response.status === 403) {
      return Promise.reject(handleApiError(new Error('Access denied')));
    }

    return Promise.reject(handleApiError(error));
  }
);

// API endpoints with retry mechanism
const withRetry = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 5000)));
    }
  }
};

export const fetchTasks = () => withRetry(() => api.get('/tasks'));
export const fetchLeaderboard = () => withRetry(() => api.get('/data/leaderboard'));
export const fetchUser = () => withRetry(() => api.get('/user'));
export const claimReward = (taskId: string) => withRetry(() => api.post('/claim-reward', { taskId }));
export const submitReferral = (referralCode: string) => withRetry(() => api.post('/referral', { referralCode }));
export const registerUser = (username: string) => withRetry(() => api.post('/register', { username }));
export const getReferralCode = () => withRetry(() => api.get('/referral-code'));
export const fetchAllData = () => withRetry(() => api.get('/data/all'));

export default api;