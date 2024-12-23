import { TelegramUser } from '../../types/telegram';

export const validateTelegramUser = (user: TelegramUser | undefined): boolean => {
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
    // Only allow access through Telegram WebApp
    if (!window.Telegram?.WebApp) {
      return false;
    }

    // Verify user data exists
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (!validateTelegramUser(user)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};