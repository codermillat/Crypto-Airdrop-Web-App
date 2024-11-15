import express from 'express';
import { connect } from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Task from './models/Task.js';
import { initialTasks } from './data/initialTasks.js';
import { initialUsers } from './data/initialUsers.js';

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

// Middleware to verify wallet address
const verifyWallet = async (req, res, next) => {
  const { address } = req.headers;
  if (!address) {
    return res.status(401).json({ error: 'Wallet address required' });
  }
  try {
    let user = await User.findOne({ address });
    if (!user) {
      user = await User.create({ 
        address,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        points: 0,
        completedTasks: []
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Routes
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

app.post('/api/claim-reward', verifyWallet, async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (req.user.completedTasks.includes(taskId)) {
      return res.status(400).json({ error: 'Reward already claimed' });
    }

    req.user.points += task.reward;
    req.user.completedTasks.push(taskId);
    await req.user.save();

    // Handle referral bonus
    if (req.user.referredBy) {
      const referrer = await User.findById(req.user.referredBy);
      if (referrer) {
        referrer.points += Math.floor(task.reward * 0.1); // 10% referral bonus
        await referrer.save();
      }
    }

    res.json({ success: true, points: req.user.points });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim reward' });
  }
});

app.post('/api/referral', verifyWallet, async (req, res) => {
  const { referralCode } = req.body;
  try {
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }
    
    if (referrer._id.equals(req.user._id)) {
      return res.status(400).json({ error: 'Cannot refer yourself' });
    }

    if (req.user.referredBy) {
      return res.status(400).json({ error: 'Already referred' });
    }

    req.user.referredBy = referrer._id;
    referrer.referralCount += 1;
    
    await Promise.all([req.user.save(), referrer.save()]);
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process referral' });
  }
});

app.get('/api/user', verifyWallet, async (req, res) => {
  try {
    const user = await User.findOne({ address: req.headers.address })
      .select('-__v');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.post('/api/register', verifyWallet, async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    req.user.username = username;
    req.user.isRegistered = true;
    await req.user.save();

    res.json({ success: true, user: req.user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.get('/api/referral-code', verifyWallet, async (req, res) => {
  try {
    res.json({ code: req.user.referralCode });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get referral code' });
  }
});

app.get('/api/rewards', verifyWallet, async (req, res) => {
  try {
    const rewards = [
      {
        id: 'daily',
        title: 'Daily Check-in',
        amount: 50,
        icon: '📅',
        claimed: req.user.lastDailyReward ? 
          new Date().toDateString() === new Date(req.user.lastDailyReward).toDateString() : 
          false
      },
      {
        id: 'community',
        title: 'Community Reward',
        amount: 100,
        icon: '🎁',
        claimed: req.user.claimedCommunityReward || false
      }
    ];
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

app.post('/api/rewards/daily/claim', verifyWallet, async (req, res) => {
  try {
    const today = new Date().toDateString();
    const lastReward = req.user.lastDailyReward ? 
      new Date(req.user.lastDailyReward).toDateString() : 
      null;

    if (today === lastReward) {
      return res.status(400).json({ error: 'Daily reward already claimed' });
    }

    req.user.points += 50;
    req.user.lastDailyReward = new Date();
    await req.user.save();

    res.json({ success: true, points: req.user.points });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim daily reward' });
  }
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});