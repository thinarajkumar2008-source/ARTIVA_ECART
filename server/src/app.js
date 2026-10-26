import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import contactRoutes from './routes/contact.js';
import { checkDatabaseConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// API Health Check & Info
app.get('/api/health', async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  res.json({
    status: 'online',
    appName: 'ARTIVA Backend API',
    database: dbStatus ? 'PostgreSQL Connected' : 'Local In-Memory Mode',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(500).json({ error: 'An unexpected internal error occurred.' });
});

// Start Server if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    console.log(`🎨 ARTIVA API Server running on port ${PORT}`);
    const isDbReady = await checkDatabaseConnection();
    console.log(`📊 Database Status: ${isDbReady ? 'Connected to PostgreSQL' : 'Fallback Local Mode Active'}`);
  });
}

export default app;
