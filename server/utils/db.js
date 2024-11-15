import Task from '../models/Task.js';
import User from '../models/User.js';
import { initialTasks } from '../data/initialTasks.js';

export const initializeDatabase = async () => {
  try {
    // Check if database is already initialized
    const tasksCount = await Task.countDocuments();
    if (tasksCount > 0) {
      console.log('Database already initialized');
      return;
    }

    // Create admin user
    const adminUser = new User({
      address: process.env.ADMIN_WALLET_ADDRESS || 'EQD_w8w6HHVnvqj5KhgQE7gFBUz94oZUZBpLhUFXh_7nj3rk',
      username: 'admin',
      points: 1000,
      role: 'admin',
      referralCode: 'ADMIN01',
      isActive: true,
      completedTasks: [],
      isRegistered: true
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create initial tasks
    await Task.insertMany(initialTasks);
    console.log('Initial tasks created');

    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};