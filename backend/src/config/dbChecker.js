require('dotenv').config();
const mysql = require('mysql2/promise');

/**
 * Database Error Checker
 * Validates connection, credentials, and environment before app starts
 */

const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

const checkDatabaseConnection = async () => {
  console.log(colors.cyan('\n═══════════════════════════════════════════════════════'));
  console.log(colors.cyan('🔍 DATABASE CONNECTION CHECKER'));
  console.log(colors.cyan('═══════════════════════════════════════════════════════\n'));

  // 1. Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error(colors.red('❌ ERROR: DATABASE_URL environment variable is not set'));
    console.log('\n📋 Fix:');
    console.log('   1. Add DATABASE_URL to your .env file:');
    console.log('      DATABASE_URL=mysql://user:password@host:port/database');
    console.log('   2. Verify the .env file exists in backend/ directory');
    console.log('   3. On Render: Add DATABASE_URL to Environment Variables in dashboard\n');
    return false;
  }

  console.log(colors.green('✅ DATABASE_URL is set'));
  console.log(`   URL: mysql://${maskPassword(process.env.DATABASE_URL)}\n`);

  // 2. Parse and validate DATABASE_URL format
  let dbUrl;
  try {
    dbUrl = new URL(process.env.DATABASE_URL);
    if (!dbUrl.protocol.startsWith('mysql')) {
      throw new Error('Protocol must start with "mysql"');
    }
    console.log(colors.green('✅ DATABASE_URL format is valid\n'));
  } catch (err) {
    console.error(colors.red(`❌ ERROR: Invalid DATABASE_URL format`));
    console.log(`   ${err.message}`);
    console.log('\n📋 Expected format:');
    console.log('   mysql://username:password@hostname:port/database\n');
    console.log('📋 Example:');
    console.log('   mysql://root:mypassword@localhost:3306/flipkart_clone\n');
    return false;
  }

  // 3. Extract and show credentials (masked)
  const host = dbUrl.hostname;
  const port = Number(dbUrl.port || 3306);
  const user = decodeURIComponent(dbUrl.username);
  const password = decodeURIComponent(dbUrl.password);
  const database = dbUrl.pathname ? dbUrl.pathname.replace(/^\//, '') : '';

  console.log(colors.bold('Connection Details:'));
  console.log(`   Host:     ${host}`);
  console.log(`   Port:     ${port}`);
  console.log(`   User:     ${user}`);
  console.log(`   Password: ${password ? '***' + password.slice(-3) : '(empty)'}`);
  console.log(`   Database: ${database}\n`);

  // 4. Test actual connection
  console.log(colors.yellow('🔗 Testing connection...\n'));

  let connection;
  try {
    const config = {
      host,
      port,
      user,
      password,
      database,
      enableKeepAlive: true,
      decimalNumbers: true,
    };

    // Add SSL for remote hosts
    if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
      config.ssl = { rejectUnauthorized: false };
      console.log(colors.yellow('   ℹ️  Using SSL for remote host connection\n'));
    }

    connection = await mysql.createConnection(config);
    console.log(colors.green('✅ Connection successful\n'));

    // 5. Test queries
    console.log(colors.yellow('🧪 Running diagnostics...\n'));

    // Test 1: Simple ping
    try {
      const [result] = await connection.query('SELECT 1 AS test');
      console.log(colors.green('✅ Ping query successful'));
    } catch (err) {
      console.error(colors.red('❌ Ping query failed: ' + err.message));
      return false;
    }

    // Test 2: Check database exists
    try {
      const [databases] = await connection.query(
        'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
        [database]
      );
      if (databases.length === 0) {
        console.warn(colors.yellow('⚠️  Database does not exist yet (will be created on first seed)\n'));
      } else {
        console.log(colors.green(`✅ Database "${database}" exists\n`));

        // Test 3: Check tables
        try {
          const [tables] = await connection.query(
            'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?',
            [database]
          );
          if (tables.length === 0) {
            console.log(colors.yellow('⚠️  No tables found (run npm run seed)\n'));
          } else {
            console.log(colors.green(`✅ Database contains ${tables.length} tables\n`));
            console.log('   Tables:');
            tables.forEach((t) => console.log(`      - ${t.TABLE_NAME}`));
            console.log();
          }
        } catch (err) {
          console.warn(colors.yellow('⚠️  Could not check tables: ' + err.message + '\n'));
        }
      }
    } catch (err) {
      console.warn(colors.yellow('⚠️  Could not check if database exists: ' + err.message + '\n'));
    }

    await connection.end();

    console.log(colors.green(colors.bold('✅ All checks passed!\n')));
    console.log(colors.cyan('═══════════════════════════════════════════════════════\n'));
    return true;
  } catch (err) {
    console.error(colors.red(`❌ Connection failed: ${err.message}\n`));

    // Detailed error diagnostics
    console.log(colors.bold('🔍 Error Diagnostics:\n'));

    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error(colors.red('Authentication Error'));
      console.log('   • Username or password is incorrect');
      console.log('   • Check DATABASE_URL credentials match database user');
      console.log('   • On Railway: Verify password has no special chars, or URL encode them\n');
    } else if (err.code === 'ECONNREFUSED') {
      console.error(colors.red('Connection Refused'));
      console.log('   • Database server is not running or not listening');
      console.log('   • Check host is correct and port is accessible');
      console.log('   • Verify firewall allows connection on specified port');
      console.log('   • On Render: Verify internal/external port settings\n');
    } else if (err.code === 'ENOTFOUND') {
      console.error(colors.red('Host Not Found'));
      console.log('   • Hostname is invalid or DNS cannot resolve it');
      console.log('   • Check DATABASE_URL host is correct');
      console.log('   • Verify network connectivity to the host\n');
    } else if (err.code === 'ETIMEDOUT' || err.code === 'EHOSTUNREACH') {
      console.error(colors.red('Connection Timeout/Unreachable'));
      console.log('   • Network is unreachable or connection timed out');
      console.log('   • Check if database server is running');
      console.log('   • On Render: May need to use internal database URL or add IP allowlist');
      console.log('   • Verify firewall/security rules allow outbound connections\n');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error(colors.red('Database Does Not Exist'));
      console.log('   • Run "npm run seed" to create database and tables');
      console.log('   • Or create database manually and retry\n');
    } else {
      console.error(colors.red(`Unknown Error (${err.code})`));
      console.log(`   Message: ${err.message}\n`);
    }

    console.log(colors.bold('📋 Environment Variables:'));
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
    console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'NOT SET'}`);
    console.log(`   PORT: ${process.env.PORT || 'not set (default 5000)'}\n`);

    console.log(colors.cyan('═══════════════════════════════════════════════════════\n'));
    return false;
  }
};

/**
 * Mask password in connection string for logging
 */
const maskPassword = (url) => {
  try {
    const dbUrl = new URL(url);
    const password = dbUrl.password;
    if (password) {
      dbUrl.password = password.slice(0, 3) + '*'.repeat(Math.max(0, password.length - 3));
    }
    return dbUrl.toString();
  } catch {
    return 'invalid-url';
  }
};

module.exports = { checkDatabaseConnection };
