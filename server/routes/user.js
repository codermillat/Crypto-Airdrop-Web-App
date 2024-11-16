import { Router } from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import { verifyWallet } from '../middleware/auth.js';

const router = Router();

// Get user profile
router.get('/', verifyWallet, async (req, res) => {
  try {
    const user = await User.findOne({ address: req.user.address })
      .select('-__v')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Get user tasks
router.get('/tasks', verifyWallet, async (req, res) => {
  try {
    const tasks = await Task.find({ isActive: true })
      .select('-__v')
      .lean();

    const user = await User.findOne({ address: req.user.address })
      .select('completedTasks')
      .lean();

    const tasksWithStatus = tasks.map(task => ({
      ...task,
      completed: user.completedTasks.includes(task._id)
    }));

    res.json(tasksWithStatus);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get user referrals
router.get('/referrals', verifyWallet, async (req, res) => {
  try {
    const user = await User.findOne({ address: req.user.address });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const referrals = await User.find({ referredBy: user._id })
      .select('username points createdAt')
      .lean();

    const formattedReferrals = referrals.map(ref => ({
      username: ref.username || 'Anonymous',
      points: ref.points,
      joinedAt: ref.createdAt
    }));

    res.json(formattedReferrals);
  } catch (error) {
    console.error('Failed to fetch referrals:', error);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

// Get referral code
router.get('/referral-code', verifyWallet, async (req, res) => {
  try {
    const user = await User.findOne({ address: req.user.address })
      .select('referralCode')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ code: user.referralCode });
  } catch (error) {
    console.error('Failed to fetch referral code:', error);
    res.status(500).json({ error: 'Failed to fetch referral code' });
  }
});

// Submit referral
router.post('/referral', verifyWallet, async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    if (!referralCode) {
      return res.status(400).json({ error: 'Referral code required' });
    }

    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    const user = await User.findOne({ address: req.user.address });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.referredBy) {
      return res.status(400).json({ error: 'Already used a referral code' });
    }

    if (referrer.address === user.address) {
      return res.status(400).json({ error: 'Cannot use own referral code' });
    }

    // Update referrer
    referrer.referralCount += 1;
    referrer.points += 100; // Bonus for referrer
    await referrer.save();

    // Update user
    user.referredBy = referrer._id;
    user.points += 200; // Bonus for using referral
    await user.save();

    res.json({ 
      points: user.points,
      message: 'Referral code applied successfully!'
    });
  } catch (error) {
    console.error('Failed to submit referral:', error);
    res.status(500).json({ error: 'Failed to submit referral' });
  }
});

// Claim task reward
router.post('/claim-reward', verifyWallet, async (req, res) => {
  try {
    const { taskId } = req.body;
    
    const task = await Task.findById(taskId);
    if (!task || !task.isActive) {
      return res.status(404).json({ error: 'Task not found or inactive' });
    }

    const user = await User.findOne({ address: req.user.address });
    if (user.completedTasks.includes(taskId)) {
      return res.status(400).json({ error: 'Task already completed' });
    }

    user.points += task.reward;
    user.completedTasks.push(taskId);
    await user.save();

    res.json({ 
      points: user.points,
      message: `Earned ${task.reward} points!`
    });
  } catch (error) {
    console.error('Failed to claim reward:', error);
    res.status(500).json({ error: 'Failed to claim reward' });
  }
});

export default router;