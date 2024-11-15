import express from 'express';
import { connect } from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Task from './models/Task.js';
import { initialTasks } from './data/initialTasks.js';
import { initialUsers } from './data/initialUsers.js';
import dataRoutes from './routes/data.js';
import { verifyWallet } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cryptoDB:cryptoDB@cluster0.f86yd.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB and initialize data
async function connectDB() {
  try {
    await connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Create initial tasks if none exist
    const tasksCount = await Task.countDocuments();
    if (tasksCount === 0) {
      await Task.insertMany(initialTasks);
      console.log('Initial tasks created');
    }

    // Create initial users if none exist
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      await User.insertMany(initialUsers);
      console.log('Initial users created');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

app.use(cors({
  origin: ['https://crypto-airdrop-paws.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Add data routes
app.use('/api/data', verifyWallet, dataRoutes);

// User routes
app.get('/api/user', verifyWallet, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Tasks routes
app.get('/api/tasks', verifyWallet, async (req, res) => {
  try {
    const tasks = await Task.find({ active: true });
    const userTasks = tasks.map(task => ({
      ...task.toObject(),
      completed: req.user.completedTasks.includes(task._id)
    }));
    res.json(userTasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Leaderboard route
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .limit(100)
      .select('address points username');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});