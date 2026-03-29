require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initSchema = require('./config/schema');
const { checkDatabaseConnection } = require('./config/dbChecker');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/wishlist', require('./routes/wishlist'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log('🚀 Starting server...');
    console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('   PORT:', PORT);
    
    // Run database checks before starting
    const dbOk = await checkDatabaseConnection();
    if (!dbOk) {
      console.error('❌ Database checks failed. Fix the errors above and try again.');
      process.exit(1);
    }
    
    await initSchema();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✨ Server running on http://localhost:${PORT}`);
      console.log(`   API: http://localhost:${PORT}/api`);
      console.log(`   Health: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    console.error('   Tip: Check database connection, credentials, and network accessibility.');
    process.exit(1);
  }
};

start();
