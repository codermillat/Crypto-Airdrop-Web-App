import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyWallet = async (req, res, next) => {
  const { address } = req.headers;
  
  if (!address) {
    return res.status(401).json({ error: 'Wallet address required' });
  }

  try {
    let user = await User.findOne({ address });
    
    if (!user) {
      user = await User.create({ 
        address,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        points: 0,
        completedTasks: []
      });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};