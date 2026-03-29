#!/usr/bin/env node

/**
 * Database Diagnostic Script
 * Run this independently to test database connectivity before server start
 * Usage: npm run db:check
 */

require('dotenv').config();
const { checkDatabaseConnection } = require('../src/config/dbChecker');

(async () => {
  const success = await checkDatabaseConnection();
  process.exit(success ? 0 : 1);
})();
