import Task from '../models/Task.js';
import User from '../models/User.js';
import { initialTasks } from '../data/initialTasks.js';

export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');

    // Check if database is already initialized
    const tasksCount = await Task.countDocuments();
    const usersCount = await User.countDocuments();

    console.log(`Current state: ${tasksCount} tasks, ${usersCount} users`);

    if (tasksCount === 0) {
      console.log('Creating initial tasks...');
      await Task.insertMany(initialTasks);
      console.log('Initial tasks created');
    }

    // Create admin user if doesn't exist
    const adminAddress = process.env.ADMIN_WALLET_ADDRESS || 'UQAnlr2RPgdNbmC3SKrT6Dbf9YEowgNb44FMOXPBffb4v30c';
    const adminExists = await User.findOne({ address: adminAddress });

    if (!adminExists) {
      console.log('Creating admin user...');
      const adminUser = new User({
        address: adminAddress,
        username: 'admin',
        points: 1000,
        role: 'admin',
        referralCode: 'ADMIN01',
        isActive: true,
        completedTasks: [],
        isRegistered: true,
        createdAt: new Date()
      });
      await adminUser.save();
      console.log('Admin user created');
    }

    console.log('Database initialization completed');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};