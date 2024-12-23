import { validateTelegramId } from '../utils/validation.js';

export const validateTelegramUser = async (req, res, next) => {
  try {
    const { telegramId } = req.body;

    if (!validateTelegramId(telegramId)) {
      return res.status(400).json({ error: 'Invalid Telegram ID' });
    }

    // Store validated telegramId for later use
    req.telegramId = telegramId;
    next();
  } catch (error) {
    console.error('Telegram validation error:', error);
    res.status(500).json({ error: 'Failed to validate Telegram user' });
  }
};