import User from '../models/User.js';
import Task from '../models/Task.js';

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalTasks,
      activeTasks,
      totalPoints,
      topUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Task.countDocuments(),
      Task.countDocuments({ isActive: true }),
      User.aggregate([{ $group: { _id: null, total: { $sum: '$points' } } }]),
      User.find()
        .sort({ points: -1 })
        .limit(5)
        .select('username address points referralCount')
    ]);

    res.json({
      stats: {
        totalUsers,
        activeUsers,
        totalTasks,
        activeTasks,
        totalPoints: totalPoints[0]?.total || 0
      },
      topUsers
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin statistics' });
  }
};

export const manageUser = async (req, res) => {
  const { userId } = req.params;
  const { action } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    switch (action) {
      case 'ban':
        user.isActive = false;
        break;
      case 'unban':
        user.isActive = true;
        break;
      case 'makeAdmin':
        user.role = 'admin';
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('User management error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const manageTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    Object.assign(task, updates);
    await task.save();
    
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Task management error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};