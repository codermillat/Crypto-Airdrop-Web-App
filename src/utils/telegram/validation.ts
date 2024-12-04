import { TelegramUser, WebAppInitData } from './types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateWebAppUser = (user: TelegramUser | undefined): boolean => {
  if (!user?.id || !user?.first_name) {
    return false;
  }
  return true;
};

export const validateInitData = (data: WebAppInitData): void => {
  if (!data.auth_date || Date.now() / 1000 - data.auth_date > 86400) {
    throw new ValidationError('Authentication data has expired');
  }

  if (!validateWebAppUser(data.user)) {
    throw new ValidationError('Invalid user data');
  }
};

export const validatePlatform = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('telegram') || 
         userAgent.includes('tgweb') || 
         !!window.Telegram?.WebApp;
};