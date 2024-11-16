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
  timeout: 15000,
  retry: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers['x-wallet-address'] = address;
  }
  
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
    
    if (import.meta.env.DEV) {
      console.error('API Error:', response?.data || error.message);
    }

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
      return Promise.reject(handleApiError(new Error('Please connect your wall
