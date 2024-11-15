import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';
import dataRoutes from './routes/data.js';
import { verifyWallet, verifyAdmin } from './middleware/auth.js';
import User from './models/User.js';
import Task from './models/Task.js';
import { initialTasks } from './data/initialTasks.js';
import { initialUsers } from './data/initialUsers.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Database connection with retry mechanism
async function connectDB(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await connect(MONGODB_URI);
      console.log('Connected to MongoDB');
      
      // Initialize data if needed
      const tasksCount = await Task.countDocuments();
      if (tasksCount === 0) {
        await Task.insertMany(initialTasks);
        console.log('Initial tasks created');
      }

      const usersCount = await User.countDocuments();
      if (usersCount === 0) {
        await User.insertMany(initialUsers);
        console.log('Initial users created');
      }
      
      return true;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://crypto-airdrop-paws.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'address']
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User routes
app.get('/api/user', verifyWallet, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.post('/api/register', verifyWallet, async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Invalid username' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, isRegistered: true },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Task routes
app.get('/api/tasks', verifyWallet, async (req, res) => {
  try {
    const tasks = await Task.find({ isActive: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Protected routes
app.use('/api/admin', verifyAdmin, adminRoutes);
app.use('/api/data', verifyWallet, dataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});