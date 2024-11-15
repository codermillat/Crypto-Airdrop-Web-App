import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getTelegramUser } from '../utils/telegram.js';

export const registerUser = async (req, res) => {
  try {
    const { username, telegramId } = req.body;
    const { address } = req.user;

    console.log('Register user request:', { username, telegramId, address });

    if (!address) {
      return res.status(400).json({ error: 'Wallet address required' });
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

    // Get Telegram username if available
    let finalUsername = username;
    if (telegramId) {
      try {
        const telegramUser = await getTelegramUser(telegramId);
        console.log('Telegram user data:', telegramUser);
        if (telegramUser?.username) {
          finalUsername = telegramUser.username;
        }
      } catch (err) {
        console.error('Failed to fetch Telegram user:', err);
      }
    }

    // Check if username is already taken by another user
    const existingUser = await User.findOne({ 
      username: finalUsername,
      address: { $ne: address } // Exclude current user
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Update user
    user.username = finalUsername;
    if (telegramId) {
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