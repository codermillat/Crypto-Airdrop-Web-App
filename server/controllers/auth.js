import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getTelegramUser } from '../utils/telegram.js';

export const registerUser = async (req, res) => {
  try {
    const { username, telegramId } = req.body;
    const { address } = req.user;

    // Verify if user exists
    let user = await User.findOne({ address });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get Telegram username if available
    let finalUsername = username;
    if (telegramId) {
      try {
        const telegramUser = await getTelegramUser(telegramId);
        if (telegramUser?.username) {
          finalUsername = telegramUser.username;
        }
      } catch (err) {
        console.error('Failed to fetch Telegram user:', err);
      }
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ username: finalUsername });
    if (existingUser && existingUser.address !== address) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Update user
    user.username = finalUsername;
    user.isRegistered = true;
    if (telegramId) {
      user.telegramId = telegramId;
    }

    await user.save();

    res.json({ 
      user: {
        address: user.address,
        username: user.username,
        points: user.points,
        referralCode: user.referralCode,
        isRegistered: user.isRegistered
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};