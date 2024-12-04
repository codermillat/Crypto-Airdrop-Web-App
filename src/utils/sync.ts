import axios from 'axios';

interface SyncStatus {
  api: boolean;
  database: boolean;
  telegram: boolean;
}

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`, {
      timeout: 5000
    });
    return response.data?.status === 'ok';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`, {
      timeout: 5000
    });
    return response.data?.database === 'connected';
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

export const checkTelegramConnection = (): boolean => {
  try {
    return !!window.Telegram?.WebApp;
  } catch (error) {
    console.error('Telegram connection check failed:', error);
    return false;
  }
};

export const syncServices = async (): Promise<{ status: SyncStatus; error?: string }> => {
  const status: SyncStatus = {
    api: false,
    database: false,
    telegram: false
  };

  try {
    // Check Telegram first as it's required
    status.telegram = checkTelegramConnection();
    if (!status.telegram) {
      return { 
        status, 
        error: 'Please open the app in Telegram' 
      };
    }

    // Check API and Database in parallel
    const [apiStatus, dbStatus] = await Promise.all([
      checkApiHealth(),
      checkDatabaseConnection()
    ]);

    status.api = apiStatus;
    status.database = dbStatus;

    if (!apiStatus || !dbStatus) {
      return { 
        status,
        error: 'Some services are not available. Please try again later.'
      };
    }

    return { status };
  } catch (error) {
    console.error('Service sync error:', error);
    return { 
      status, 
      error: 'Failed to connect to services. Please try again.' 
    };
  }
};
