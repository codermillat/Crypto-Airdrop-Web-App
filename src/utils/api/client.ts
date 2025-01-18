import axios from 'axios';
import { getConfig } from '../config';
import { handleApiError } from '../error';

const api = axios.create({
  baseURL: getConfig().apiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add wallet address header
api.interceptors.request.use(config => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers['x-wallet-address'] = address;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    throw handleApiError(error);
  }
);

export default api;