import Task from '../models/Task.js';
import User from '../models/User.js';

export const fetchAllData = async (req, res) => {
  try {
    // Fetch all tasks
    const tasks = await Task.find().sort({ createdAt: -1 });
    
    // Fetch all users with their stats
    const users = await User.find().sort({ points: -1 });

    // Calculate total stats
    const totalUsers = users.length;
    const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
    const totalTasks = tasks.length;
    const totalCompletedTasks = users.reduce((sum, user) => sum + user.completedTasks.length, 0);

    res.json({
      stats: {
        totalUsers,
        totalPoints,
        totalTasks,
        totalCompletedTasks,
        averagePoints: totalUsers ? Math.floor(totalPoints / totalUsers) : 0
      },
      tasks,
      users: users.map(user => ({
        address: user.address,
        username: user.username,
        points: user.points,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        completedTasks: user.completedTasks,
        isRegistered: user.isRegistered,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};