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
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.URL || 'http://localhost:5173';

async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
    
    await initializeDatabase();
    console.log('Database initialized with sample data');
  } catch (err) {
    console.error('MongoDB connection/initialization error:', err);
    process.exit(1);
  }
}

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173'],
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
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});