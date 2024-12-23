import axios from 'axios';
import { getConfig } from './config';
import { handleApiError } from './error';

const { apiUrl } = getConfig();

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 15000
});

// Rest of the file remains the same...