import { Router } from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = Router();

// Get all data (admin only)
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const [tasks, users, stats] = await Promise.all([
      Task.find().sort({ createdAt: -1 }),
      User.find().sort({ points: -1 }),
      User.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            totalPoints: { $sum: '$points' },
            activeUsers: {
              $sum: {
                $cond: [{ $gt: ['$lastLogin', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] }, 1, 0]
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

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('address username points')
      .sort({ points: -1 })
      .limit(100);

    res.json(users);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get referrals
router.get('/referrals', async (req, res) => {
  try {
    const referrals = await User.find({ referredBy: req.user._id })
      .select('username points createdAt')
      .sort({ points: -1 });

    res.json(referrals);
  } catch (error) {
    console.error('Failed to fetch referrals:', error);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

export default router;