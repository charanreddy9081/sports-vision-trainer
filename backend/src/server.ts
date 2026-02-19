import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import trainingRoutes from './routes/trainingRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Allow both 3000 and 3001 (Next.js may use 3001 when 3000 is in use)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  FRONTEND_URL,
].filter((origin, index, self) => self.indexOf(origin) === index);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, server-to-server)
    if (!origin) return callback(null, true);
    
    // In production, check against allowed origins
    if (NODE_ENV === 'production') {
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    }
    
    // In development, allow all origins
    callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

// Root - API info (frontend runs on port 3000/3001)
app.get('/', (req, res) => {
  res.json({
    message: 'Sports Vision Trainer API',
    docs: 'API runs here. Open the app at http://localhost:3000 or http://localhost:3001',
    health: '/health',
    auth: '/api/auth/*',
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$connect();
    await prisma.$disconnect();
    
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
});
