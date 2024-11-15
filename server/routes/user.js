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