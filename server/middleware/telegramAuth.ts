import { validateInitData } from '@telegram-apps/init-data-node';
import { Request, Response, NextFunction } from 'express';
import { debugLog } from '../utils/debug';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}

export const validateTelegramAuth = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const initData = req.headers['x-telegram-init-data'] as string;
    
    if (!initData) {
      debugLog('No init data provided');
      return res.status(401).json({ error: 'Telegram authentication required' });
    }

    const isValid = validateInitData(initData, BOT_TOKEN);
    
    if (!isValid) {
      debugLog('Invalid init data');
      return res.status(401).json({ error: 'Invalid Telegram authentication' });
    }

    // Parse and attach user data to request
    const data = Object.fromEntries(new URLSearchParams(initData));
    req.telegramUser = JSON.parse(data.user || '{}');
    
    next();
  } catch (error) {
    debugLog('Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};