import axios from 'axios';
import { handleApiError } from './error';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://crypto-airdrop-web-app.onrender.com/api';

const MOCK_DATA = {
  user: {
    address: null,
    username: null,
    points: 0,
    referralCode: 'DEMO123',
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
  ],
  referrals: [],
  referralCode: 'DEMO123'
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

const useMockData = (path: string, config?: any) => {
  if (path.includes('/user')) return MOCK_DATA.user;
  if (path.includes('/tasks')) return MOCK_DATA.tasks;
  if (path.includes('/leaderboard')) return MOCK_DATA.leaderboard;
  if (path.includes('/rewards')) return MOCK_DATA.rewards;
  if (path.includes('/referrals')) return MOCK_DATA.referrals;
  if (path.includes('/referral-code')) return { code: MOCK_DATA.referralCode };
  if (path.includes('/register')) {
    return {
      user: {
        ...MOCK_DATA.user,
        username: config?.data?.username,
        isRegistered: true
      }
    };
  }
  if (path.includes('/claim-reward')) {
    const taskId = config?.data?.taskId;
    const task = MOCK_DATA.tasks.find(t => t._id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return {
      points: MOCK_DATA.user.points + task.reward
    };
  }
  return null;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a network error
    if (!error.response) {
      const mockData = useMockData(error.config.url, error.config);
      if (mockData) {
        return Promise.resolve({ data: mockData });
      }
    }
    
    // Handle specific API errors
    if (error.response?.status === 400) {
      const message = error.response.data?.error || 'Invalid request';
      return Promise.reject(new Error(message));
    }

    if (error.response?.status === 401) {
      return Promise.reject(new Error('Please connect your wallet first'));
    }

    if (error.response?.status === 403) {
      return Promise.reject(new Error('You are not authorized to perform this action'));
    }

    if (error.response?.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }

    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please try again later'));
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
  const response = await withRetry(() => api.get('/user'));
  return response.data;
};

export const fetchTasks = async () => {
  const response = await withRetry(() => api.get('/tasks'));
  return response.data;
};

export const claimReward = async (taskId: string) => {
  const response = await withRetry(() => api.post('/claim-reward', { taskId }));
  return response.data;
};

export const fetchLeaderboard = async () => {
  const response = await withRetry(() => api.get('/leaderboard'));
  return response.data;
};

export const submitReferral = async (referralCode: string) => {
  const response = await withRetry(() => api.post('/referral', { referralCode }));
  return response.data;
};

export const fetchRewards = async () => {
  const response = await withRetry(() => api.get('/rewards'));
  return response.data;
};

export const claimDailyReward = async () => {
  const response = await withRetry(() => api.post('/rewards/daily/claim'));
  return response.data;
};

export const registerUser = async (username: string) => {
  const response = await withRetry(() => api.post('/register', { username }));
  return response.data;
};

export const getReferralCode = async () => {
  const response = await withRetry(() => api.get('/referral-code'));
  return response.data;
};

export default api;