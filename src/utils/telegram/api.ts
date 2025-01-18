import axios from 'axios';
import { handleApiError } from '../error';
import { getConfig } from '../config';

const api = axios.create({
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  error => {
    throw handleApiError(error);
  }
);

export default api;