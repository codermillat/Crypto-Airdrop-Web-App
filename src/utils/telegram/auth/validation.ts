import CryptoJS from 'crypto-js';
import { getConfig } from '../../config';

const { botToken } = getConfig();

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
    const secretKey = CryptoJS.HmacSHA256(botToken, 'WebAppData');
    
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