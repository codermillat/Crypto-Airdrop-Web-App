import { REQUIRED_ENV_VARS } from './constants';

export const validateEnv = (): void => {
  const missing = REQUIRED_ENV_VARS.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};