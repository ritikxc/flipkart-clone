const mysql = require('mysql2/promise');
require('dotenv').config();

const getDatabaseConfig = () => {
  if (process.env.DATABASE_URL) {
    try {
      const dbUrl = new URL(process.env.DATABASE_URL);
      if (!dbUrl.protocol.startsWith('mysql')) {
        throw new Error('DATABASE_URL protocol must be mysql');
      }

      const config = {
        host: dbUrl.hostname,
        port: Number(dbUrl.port || 3306),
        user: decodeURIComponent(dbUrl.username),
        password: decodeURIComponent(dbUrl.password),
        database: dbUrl.pathname ? dbUrl.pathname.replace(/^\//, '') : '',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        decimalNumbers: true,
      };

      // For Railway/remote proxies: enable SSL with less strict verification
      // (Railway uses valid certs but may not match locally)
      if (dbUrl.hostname && !dbUrl.hostname.includes('localhost')) {
        config.ssl = {
          rejectUnauthorized: process.env.DB_SSL_REJECT === 'true',
        };
      }

      return config;
    } catch (err) {
      console.error('❌ Invalid DATABASE_URL format:', err.message);
      console.error('   Expected: mysql://user:password@host:port/database');
      process.exit(1);
    }
  }

  // Fallback local config (used only when DATABASE_URL is not set)
  return {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'flipkart_clone',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    decimalNumbers: true,
  };
};

const pool = mysql.createPool(getDatabaseConfig());

// Add error handlers to pool to prevent silent crashes
pool.on('error', (err) => {
  console.error('❌ Database pool error:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('   Connection to the host was lost.');
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('   Fatal error encountered before this operation.');
  }
});

pool.on('connection', () => {
  console.log('📡 Database connection acquired');
});

module.exports = pool;
