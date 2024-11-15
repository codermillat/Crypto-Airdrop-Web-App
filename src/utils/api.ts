import axios from 'axios';
import { handleApiError } from './error';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://crypto-airdrop-web-app.onrender.com/api';

const MOCK_DATA = {
  user: {
    address: null,
    username: null,
    points: 0,
    referralCode: null,
    isRegistered: false,
    completedTasks: []
  },
  tasks: [
    {
      _id: '1',
      title: 'Connect TON Wallet',
      reward: 100,
      icon: '💎',
      completed: false
    },
    {
      _id: '2',
      title: 'Join Telegram Channel',
      reward: 250,
      icon: '📢',
      completed: false
    },
    {
      _id: '3',
      title: 'Follow on Twitter',
      reward: 200,
      icon: '🐦',
      completed: false
    }
  ],
  leaderboard: [
    {
      address: 'EQAAFhjXzKuQ5N0c96nsdZQWATcJm909LYSaCAvWFxVJP80D',
      points: 5000,
      username: 'crypto_whale'
    },
    {
      address: 'EQBYHNxzKuQ5N0c96nsdZQWATcJm909LYSaCAvWFxVJP81C',
      points: 3500,
      username: 'ton_master'
    },
    {
      address: 'EQCCFhjXzKuQ5N0c96nsdZQWATcJm909LYSaCAvWFxVJP82B',
      points: 2800,
      username: 'paws_lover'
    }
  ],
  rewards: [
    {
      id: '1',
      title: 'Daily Check-in',
      amount: 50,
      icon: '📅',
      claimed: false
    },
    {
      id: '2',
      title: 'Community Reward',
      amount: 100,
      icon: '🎁',
      claimed: false
    }
  ]
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers.address = address;
  }
  return config;
});

const useMockData = (path: string) => {
  if (path.includes('/user')) return MOCK_DATA.user;
  if (path.includes('/tasks')) return MOCK_DATA.tasks;
  if (path.includes('/leaderboard')) return MOCK_DATA.leaderboard;
  if (path.includes('/rewards')) return MOCK_DATA.rewards;
  return null;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const mockData = useMockData(error.config.url);
    if (mockData) {
      return { data: mockData };
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

export const fetchUser = async () => {
  try {
    const response = await withRetry(() => api.get('/user'));
    return response.data;
  } catch (error) {
    return MOCK_DATA.user;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await withRetry(() => api.get('/tasks'));
    return response.data;
  } catch (error) {
    return MOCK_DATA.tasks;
  }
};

export const claimReward = async (taskId: string) => {
  try {
    const response = await withRetry(() => api.post('/claim-reward', { taskId }));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw error;
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await withRetry(() => api.get('/leaderboard'));
    return response.data;
  } catch (error) {
    return MOCK_DATA.leaderboard;
  }
};

export const submitReferral = async (referralCode: string) => {
  try {
    const response = await withRetry(() => api.post('/referral', { referralCode }));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw error;
  }
};

export const fetchRewards = async () => {
  try {
    const response = await withRetry(() => api.get('/rewards'));
    return response.data;
  } catch (error) {
    return MOCK_DATA.rewards;
  }
};

export const claimDailyReward = async () => {
  try {
    const response = await withRetry(() => api.post('/rewards/daily/claim'));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw error;
  }
};

export const registerUser = async (username: string) => {
  try {
    const response = await withRetry(() => api.post('/register', { username }));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw error;
  }
};

export const getReferralCode = async () => {
  try {
    const response = await withRetry(() => api.get('/referral-code'));
    return response.data;
  } catch (error) {
    return { 
      code: 'MOCK' + Math.random().toString(36).substring(2, 6).toUpperCase() 
    };
  }
};

export default api;