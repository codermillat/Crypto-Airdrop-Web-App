import axios from 'axios';
import { getTelegramWebAppUser, validateTelegramUser } from './telegram';
import { ApiError } from './error';

interface SyncStatus {
  api: boolean;
  database: boolean;
  telegram: boolean;
}

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`);
    return response.data?.status === 'ok';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`);
    return response.data?.database === 'connected';
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

export const checkTelegramConnection = (): boolean => {
  const user = getTelegramWebAppUser();
  return validateTelegramUser(user);
};

export const syncServices = async (): Promise<{ status: SyncStatus; error?: string }> => {
  const status: SyncStatus = {
    api: false,
    database: false,
    telegram: false
  };

  try {
    // Check API
    status.api = await checkApiHealth();
    if (!status.api) {
      throw new ApiError('API service is not available');
    }

    // Check Database
    status.database = await checkDatabaseConnection();
    if (!status.database) {
      throw new ApiError('Database connection failed');
    }

    // Check Telegram
    status.telegram = checkTelegramConnection();
    if (!status.telegram) {
      throw new ApiError('Telegram connection failed. Please open the app in Telegram.');
    }

    return { status };
  } catch (error) {
    const errorMessage = error instanceof ApiError ? error.message : 'Service synchronization failed';
    return { status, error: errorMessage };
  }
};