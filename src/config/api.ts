import { getEnvConfig } from './environment';

export const getApiConfig = () => {
  const { apiUrl } = getEnvConfig();
  
  return {
    baseUrl: apiUrl,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};