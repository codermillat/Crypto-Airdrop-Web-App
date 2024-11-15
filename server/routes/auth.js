import { Router } from 'express';
import { registerUser } from '../controllers/auth.js';
import { verifyWallet } from '../middleware/auth.js';
import User from '../models/User.js';

const router = Router();

// Debug endpoint
router.get('/debug', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new user
router.post('/register', verifyWallet, registerUser);

// Get or create user wallet
router.post('/wallet', async (req, res) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    console.log('Wallet registration request:', { address });

    let user = await User.findOne({ address });
    console.log('Existing user:', user);
    
    if (!user) {
      console.log('Creating new user...');
      user = await User.create({
        address,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        points: 0,
        isActive: true,
        completedTasks: [],
        role: 'user'
      });
      console.log('New user created:', user);
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is banned' });
    }

    res.json({
      address: user.address,
      username: user.username,
      points: user.points,
      referralCode: user.referralCode,
      isRegistered: !!user.username
    });
  } catch (error) {
    console.error('Wallet auth error:', error);
    res.status(500).json({ error: 'Failed to authenticate wallet' });
  }
});

export default router;