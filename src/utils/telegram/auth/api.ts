import axios from 'axios';
import { getConfig } from '../../config';
import { validateInitData } from './validation';

const { apiUrl } = getConfig();

export const authenticateUser = async (initData: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/telegram`, {
      initData
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Failed to authenticate user');
  }
};