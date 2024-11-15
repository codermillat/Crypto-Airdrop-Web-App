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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cryptoDB:cryptoDB@cluster0.f86yd.mongodb.net/?retryWrites=true&w=majority';

async function connectDB() {
  try {
    await connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
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

// Admin routes (protected)
app.use('/api/admin', verifyAdmin, adminRoutes);

// Data routes (protected)
app.use('/api/data', verifyWallet, dataRoutes);

// Public routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});