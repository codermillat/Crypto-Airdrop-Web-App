import { Router } from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';

const router = Router();

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('address username points')
      .sort({ points: -1 })
      .limit(100)
      .lean();

    res.json(users);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get referral code
router.get('/referral-code', async (req, res) => {
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
router.post('/referral', async (req, res) => {
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

// Get all data (admin only)
router.get('/all', async (req, res) => {
  try {
    const [tasks, users, stats] = await Promise.all([
      Task.find().sort({ createdAt: -1 }).lean(),
      User.find().sort({ points: -1 }).lean(),
      User.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            totalPoints: { $sum: '$points' },
            activeUsers: {
              $sum: {
                $cond: [
                  { $gt: ['$lastLogin', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] },
                  1,
                  0
                ]
              }
            }
          }
        }
      ])
    ]);

    const activeTasks = tasks.filter(task => task.isActive).length;

    res.json({
      stats: {
        totalUsers: stats[0]?.totalUsers || 0,
        activeUsers: stats[0]?.activeUsers || 0,
        totalTasks: tasks.length,
        activeTasks,
        totalPoints: stats[0]?.totalPoints || 0
      },
      tasks,
      users: users.map(user => ({
        address: user.address,
        username: user.username,
        points: user.points,
        role: user.role,
        isActive: user.isActive,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        completedTasks: user.completedTasks,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Failed to fetch all data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;