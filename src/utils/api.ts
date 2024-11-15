import axios from 'axios';
import { handleApiError } from './error';

// Use environment variable for production API URL, fallback to localhost for development
const BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'https://crypto-airdrop-web-app.onrender.com/api'
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 15000
});

// Add wallet address to all requests
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers.address = address;
  }
  return config;
}, (error) => {
  return Promise.reject(handleApiError(error));
});

// Error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Network error or timeout
    if (!error.response) {
      return Promise.reject(handleApiError(new Error('Network error. Please check your connection.')));
    }

    // Server error
    if (error.response.status >= 500) {
      return Promise.reject(handleApiError(new Error('Server error. Please try again later.')));
    }

    // Unauthorized
    if (error.response.status === 401) {
      localStorage.removeItem('wallet_address');
      return Promise.reject(handleApiError(new Error('Please connect your wallet.')));
    }

    return Promise.reject(handleApiError(error));
  }
);

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

// API endpoints
export const fetchTasks = () => withRetry(() => api.get('/tasks').then(res => res.data));
export const fetchLeaderboard = () => withRetry(() => api.get('/leaderboard').then(res => res.data));
export const fetchUser = () => withRetry(() => api.get('/user').then(res => res.data));
export const claimReward = (taskId: string) => withRetry(() => api.post('/claim-reward', { taskId }).then(res => res.data));
export const submitReferral = (referralCode: string) => withRetry(() => api.post('/referral', { referralCode }).then(res => res.data));
export const registerUser = (username: string) => withRetry(() => api.post('/register', { username }).then(res => res.data));
export const getReferralCode = () => withRetry(() => api.get('/referral-code').then(res => res.data));
export const fetchAllData = () => withRetry(() => api.get('/data/all').then(res => res.data));

export default api;