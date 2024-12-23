import jwt from 'jsonwebtoken';
import { TelegramUser } from '../types/telegram';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '24h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

export const generateToken = (user: TelegramUser): string => {
  return jwt.sign(
    { 
      id: user.id,
      username: user.username,
      first_name: user.first_name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};