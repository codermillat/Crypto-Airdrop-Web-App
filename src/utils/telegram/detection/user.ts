import { TelegramUser } from '../../../types/telegram';
import { debugLog } from '../debug';

export const validateTelegramUser = (user: TelegramUser | null): boolean => {
  if (!user) {
    debugLog('No user data provided');
    return false;
  }

  const isValid = !!(user.id && user.first_name);
  debugLog('User validation:', { isValid, user });
  return isValid;
};

export const getTelegramUser = (): TelegramUser | null => {
  try {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user || null;
    debugLog('Retrieved user:', user);
    return user;
  } catch (error) {
    debugLog('Error getting user:', error);
    return null;
  }
};