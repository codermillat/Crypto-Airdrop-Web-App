import { TelegramUser } from '../../../types/telegram';

export const validateWebAppUser = (user: TelegramUser | undefined): boolean => {
  if (!user?.id || !user?.first_name) {
    return false;
  }

  // Validate ID is within safe bounds (52 bits)
  const MAX_SAFE_ID = Math.pow(2, 52) - 1;
  if (user.id < 0 || user.id > MAX_SAFE_ID) {
    return false;
  }

  return true;
};

export const isWebAppAvailable = async (): Promise<boolean> => {
  try {
    return !!window.Telegram?.WebApp;
  } catch {
    return false;
  }
};