import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://paws-crypto-api.onrender.com/api'
    : 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add wallet address to requests
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers.address = address;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('wallet_address');
    }
    return Promise.reject(error);
  }
);

export const fetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const claimReward = async (taskId: string) => {
  const response = await api.post('/claim-reward', { taskId });
  return response.data;
};

export const fetchLeaderboard = async () => {
  const response = await api.get('/leaderboard');
  return response.data;
};

export const submitReferral = async (referralCode: string) => {
  const response = await api.post('/referral', { referralCode });
  return response.data;
};

export default api;