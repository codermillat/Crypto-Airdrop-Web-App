import api from './client';

export const fetchAllData = async () => {
  const response = await api.get('/data/all');
  return response;
};