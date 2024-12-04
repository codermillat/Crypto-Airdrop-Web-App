import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { username, telegramId, useTelegramUsername } = req.body;
    const { address } = req.user;

    console.log('Register user request:', { username, telegramId, address, useTelegramUsername });

    if (!address) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    if (!telegramId) {
      return res.status(400).json({ error: 'Telegram ID required' });
    }

    // Check if telegram ID is already registered
    const existingTelegramUser = await User.findOne({ telegramId });
    if (existingTelegramUser) {
      return res.status(400).json({ error: 'This Telegram account is already registered' });
    }

    // Create user if doesn't exist
    let user = await User.findOne({ address });
    if (!user) {
      user = new User({
        address,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        points: 0,
        isActive: true,
        completedTasks: []
      });
    }

    // Enforce Telegram username
    if (useTelegramUsername) {
      // Check if username is already taken
      const existingUser = await User.findOne({ 
        username,
        address: { $ne: address }
      });
      
      if (existingUser) {
        return res.status(400).json({ error: 'This username is already registered' });
      }

      user.username = username;
      user.telegramId = telegramId;
    }

    await user.save();
    console.log('User registered successfully:', user);

    res.json({ 
      user: {
        address: user.address,
        username: user.username,
        points: user.points,
        referralCode: user.referralCode,
        isRegistered: true
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};