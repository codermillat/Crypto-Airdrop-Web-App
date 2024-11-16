import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import dataRoutes from './routes/data.js';
import userRoutes from './routes/user.js';
import { verifyWallet } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/paws_crypto';

// CORS configuration
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-wallet-address'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  maxAge: 86400
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      headers: req.headers,
      body: req.body,
      query: req.query
    });
    next();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Connect to MongoDB with retry mechanism
const connectWithRetry = async (retries = 5, interval = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`MongoDB connection attempt ${i + 1}/${retries}`);
      await connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: 'majority'
      });
      console.log('Connected to MongoDB successfully');
      return true;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err);
      if (i < retries - 1) {
        console.log(`Retrying in ${interval/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }
  throw new Error('Failed to connect to MongoDB after multiple attempts');
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', verifyWallet, adminRoutes);
app.use('/api/data', verifyWallet, dataRoutes);
app.use('/api/user', verifyWallet, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error',
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Resource not found',
    status: 404,
    path: req.path
  });
});

// Start server and connect to database
const startServer = async () => {
  try {
    await connectWithRetry();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
