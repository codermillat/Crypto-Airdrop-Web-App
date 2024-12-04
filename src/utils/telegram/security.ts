import CryptoJS from 'crypto-js';
import { WebAppInitData } from './types';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

export const validateInitData = (initData: string): boolean => {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    if (!hash) return false;

    // Remove hash from data before validation
    urlParams.delete('hash');

    // Sort parameters alphabetically
    const params = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Generate secret key from bot token
    const secretKey = CryptoJS.HmacSHA256(BOT_TOKEN, 'WebAppData');
    
    // Calculate data hash
    const dataHash = CryptoJS.HmacSHA256(params, secretKey).toString(CryptoJS.enc.Hex);

    return dataHash === hash;
  } catch (error) {
    console.error('Error validating init data:', error);
    return false;
  }
};

export const validateAuthDate = (authDate: number): boolean => {
  const MAX_AGE = 86400; // 24 hours
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime - authDate < MAX_AGE;
};

export const validateUser = (user: WebAppInitData['user']): boolean => {
  if (!user) return false;
  
  const requiredFields: Array<keyof typeof user> = ['id', 'first_name'];
  return requiredFields.every(field => user[field] !== undefined);
};

export class TelegramSecurityError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_HASH' | 'EXPIRED_AUTH' | 'INVALID_USER' | 'INVALID_DATA'
  ) {
    super(message);
    this.name = 'TelegramSecurityError';
  }
}

export const verifyWebAppData = (data: WebAppInitData): void => {
  // Verify auth date
  if (!validateAuthDate(data.auth_date)) {
    throw new TelegramSecurityError(
      'Authentication data has expired',
      'EXPIRED_AUTH'
    );
  }

  // Verify user data
  if (!validateUser(data.user)) {
    throw new TelegramSecurityError(
      'Invalid user data',
      'INVALID_USER'
    );
  }
};