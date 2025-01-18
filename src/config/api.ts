import { getConfig } from '../utils/config';

export const getApiConfig = () => {
  const { apiUrl } = getConfig();
  
  return {
    baseURL: apiUrl,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};