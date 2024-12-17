import { TelegramUser } from '../../types/telegram';
import { getPlatformInfo } from '../../utils/telegram/platform';
import api from '../../utils/api';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const validatePlatform = (): boolean => {
  const { platform } = getPlatformInfo();
  return ['android', 'ios'].includes(platform);
};

export const authenticateUser = async (user: TelegramUser) => {
  try {
    const response = await api.post('/auth/telegram', {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      is_premium: user.is_premium,
      platform: getPlatformInfo().platform
    });
    return response.data;
  } catch (error) {
    throw new AuthError('Failed to authenticate user');
  }
};