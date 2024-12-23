import { TelegramUser } from '../../../types/telegram';

interface AuthSession {
  userId: number;
  authDate: number;
  isValid: boolean;
}

export const createAuthSession = (user: TelegramUser, authDate: number): AuthSession => ({
  userId: user.id,
  authDate,
  isValid: true
});

export const validateSession = (session: AuthSession): boolean => {
  if (!session.isValid) return false;
  
  const MAX_SESSION_AGE = 86400; // 24 hours
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime - session.authDate < MAX_SESSION_AGE;
};