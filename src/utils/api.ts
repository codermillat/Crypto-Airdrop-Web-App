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
  timeout: 15000, // 15 second timeout
  // Retry configuration
  retry: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  }
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
      data: config.data,
      headers: config.headers
    });
  }
  
  return config;
}, (error) => {
  return Promise.reject(handleApiError(error));
});

// Response interceptor with retry mechanism
api.interceptors.response.use(
  response => response.data,
  async error => {
    const { config, response } = error;
    
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('API Error:', response?.data || error.message);
    }

    // Retry the request if it failed due to network issues
    if (!response && config && config.retry > 0) {
      config.retry -= 1;
      const delayMs = config.retryDelay(config.retry);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return api(config);
    }

    if (!response) {
      return Promise.reject(handleApiError(new Error('Network error. Please check your connection and try again.')));
    }

    if (response.status === 401) {
      localStorage.removeItem('wallet_address');
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      return Promise.reject(handleApiError(new Error('Please connect your wallet')));
    }

    const errorMessage = response.data?.error || error.message;
    return Promise.reject(handleApiError(new Error(errorMessage)));
  }
);

export const registerWallet = (address: string) => 
  api.post('/auth/wallet', { address });

export const registerUser = (username: string, telegramId?: string) => 
  api.post('/auth/register', { username, telegramId });

export const fetchUser = () => api.get('/user');
export const fetchTasks = () => api.get('/user/tasks');
export const claimReward = (taskId: string) => api.post('/user/claim-reward', { taskId });
export const fetchLeaderboard = () => api.get('/data/leaderboard');
export const submitReferral = (referralCode: string) => api.post('/data/referral', { referralCode });
export const getReferralCode = () => api.get('/data/referral-code');
export const fetchAllData = () => api.get('/data/all');

export default api;
