import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

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

export default api;