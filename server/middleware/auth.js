import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const ADMIN_ADDRESSES = [
  'UQAeOdsJ-FFdX9i3zDZXLZHxUPbpNF_Ib1k1X_2U9OiV8mgH'
];

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
        role: ADMIN_ADDRESSES.includes(address) ? 'admin' : 'user'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is banned' });
    }

    user.lastLogin = new Date();
    await user.save();
    
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ address: req.headers.address });
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    next();
  } catch (err) {
    console.error('Admin verification error:', err);
    res.status(403).json({ error: 'Admin verification failed' });
  }
};