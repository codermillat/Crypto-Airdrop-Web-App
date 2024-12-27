import api from './client';

export const fetchTasks = async () => {
  const response = await api.get('/user/tasks');
  return response.data;
};

export const claimReward = async (taskId: string) => {
  const response = await api.post('/user/claim-reward', { taskId });
  return response.data;
};