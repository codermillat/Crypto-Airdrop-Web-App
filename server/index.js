import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import dataRoutes from './routes/data.js';
import userRoutes from './routes/user.js';
import { verifyWallet } from './middleware/auth.js';
import { initializeDatabase } from './utils/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/paws_crypto';
const FRONTEND_URL = process.env.URL || 'http://localhost:5173';

async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined. Please check your environment variables.');
    }

    await connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
    
    await initializeDatabase();
    console.log('Database initialized with sample data');
  } catch (err) {
    console.error('MongoDB connection/initialization error:', err);
    // Don't exit the process, let the application continue without DB
    console.log('Starting server without database connection...');
  }
}

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-wallet-address']
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body,
    query: req.query
  });
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', verifyWallet, adminRoutes);
app.use('/api/data', verifyWallet, dataRoutes);
app.use('/api/user', verifyWallet, userRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    status: err.status || 500
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Resource not found',
    status: 404,
    path: req.path
  });
});

// Start server first, then try to connect to database
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Try to connect to database after server is running
  connectDB().catch(console.error);
});