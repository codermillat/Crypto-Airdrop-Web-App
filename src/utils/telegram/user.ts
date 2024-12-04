import { TelegramUser } from '../../types/telegram';

export class TelegramUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TelegramUserError';
  }
}

export const getTelegramUser = (): TelegramUser | null => {
  try {
    const webApp = window.Telegram?.WebApp;
    if (!webApp?.initDataUnsafe?.user) {
      return null;
    }
    return webApp.initDataUnsafe.user;
  } catch (error) {
    console.error('Failed to get Telegram user:', error);
    return null;
  }
};

export const validateTelegramUser = (user: TelegramUser | null): boolean => {
  if (!user) return false;

  // Required fields according to Telegram WebApp documentation
  const requiredFields: (keyof TelegramUser)[] = ['id', 'first_name'];
  const hasRequiredFields = requiredFields.every(field => user[field] !== undefined);

  if (!hasRequiredFields) {
    console.error('Missing required user fields');
    return false;
  }

  // Validate ID is within safe bounds (52 bits)
  const MAX_SAFE_ID = Math.pow(2, 52) - 1;
  if (user.id < 0 || user.id > MAX_SAFE_ID) {
    console.error('User ID out of safe bounds');
    return false;
  }

  return true;
};

export const getUserDisplayName = (user: TelegramUser): string => {
  if (user.username) {
    return `@${user.username}`;
  }
  
  return [user.first_name, user.last_name]
    .filter(Boolean)
    .join(' ');
};

export const hasRequiredPermissions = (user: TelegramUser): boolean => {
  // Check if user has allowed bot to message them
  if (!user.allows_write_to_pm) {
    return false;
  }

  // Check if bot is added to attachment menu (if needed)
  if (!user.added_to_attachment_menu) {
    return false;
  }

  return true;
};