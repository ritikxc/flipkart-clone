# Database Error Checker Guide

Your backend now includes a comprehensive **database error checker** that helps diagnose connection failures, especially during Render deployments.

## 🔍 What It Does

The error checker automatically runs when you start the server and:

✅ Validates `DATABASE_URL` environment variable is set  
✅ Parses and validates the connection string format  
✅ Tests actual connectivity to the database  
✅ Verifies credentials (user/password)  
✅ Checks if database exists  
✅ Lists all tables (if database is initialized)  
✅ Provides specific error diagnostics if anything fails  

## 🚀 Usage

### Option 1: Automatic Check (Runs During Server Start)

```bash
npm start
```

Or in production:
```bash
node src/server.js
```

Output will show:
```
═══════════════════════════════════════════════════════
🔍 DATABASE CONNECTION CHECKER
═══════════════════════════════════════════════════════

✅ DATABASE_URL is set
✅ DATABASE_URL format is valid
✅ Connection successful
✅ Ping query successful
✅ Database "railway" exists
✅ Database contains 9 tables

✅ All checks passed!
═══════════════════════════════════════════════════════
```

### Option 2: Standalone Diagnostic Check

Run this **before** starting the server to test database connectivity:

```bash
npm run db:check
```

This is useful for:
- Testing in a separate container before deployment
- Debugging without starting the full server
- CI/CD pipelines to validate environment before deploy
- Render: Add to your build/start script

## 🛠️ Render Deployment Setup

### Step 1: Add to Render Environment Variables

1. Go to your Render service dashboard
2. Settings → Environment → Add Variable
3. Add: `DATABASE_URL` = `mysql://root:password@hopper.proxy.rlwy.net:46348/railway`

### Step 2: Update Start Command (Optional but Recommended)

In Render settings, change the **Start Command** to run the check first:

```bash
npm run db:check && npm start
```

This makes deployment logs crystal clear about what's failing.

### Step 3: View Deployment Logs

When deployment fails, Render's log viewer will show:

```
🚀 Starting server...
   NODE_ENV: production
   PORT: 5000

═══════════════════════════════════════════════════════
🔍 DATABASE CONNECTION CHECKER
═══════════════════════════════════════════════════════

✅ DATABASE_URL is set
   URL: mysql://root:***@hopper.proxy.rlwy.net:46348/railway

❌ Connection failed: connect ECONNREFUSED 46348

🔍 Error Diagnostics:

Connection Refused
   • Database server is not running or not listening
   • Check host is correct and port is accessible
   • Verify firewall allows connection on specified port
   • On Render: Verify internal/external port settings
```

## 📋 Common Error Messages & Fixes

### ❌ `DATABASE_URL is not set`

**Problem:** Environment variable missing  
**Fix:**
- Render: Go to Settings → Environment → Add `DATABASE_URL` variable
- Local: Create `.env` file in `backend/` with `DATABASE_URL=...`

---

### ❌ `Invalid DATABASE_URL format`

**Problem:** Connection string is malformed  
**Fix:** Use this format:
```
mysql://username:password@hostname:port/database
```

Examples:
```
mysql://root:password@localhost:3306/flipkart_clone
mysql://root:xBfnDyYdnSOIrtreSfmbBCSQeXRCxUBJ@hopper.proxy.rlwy.net:46348/railway
```

---

### ❌ `Authentication Error (ER_ACCESS_DENIED_ERROR)`

**Problem:** Username or password is wrong  
**Fix:**
1. Verify credentials in `DATABASE_URL`
2. If password contains special chars, URL-encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `:` → `%3A`
3. Example: `password@123` → `password%40123`

---

### ❌ `Connection Refused (ECONNREFUSED)`

**Problem:** Database server is down or port is wrong  
**Fix:**
- Check database is running on Railway/your provider
- Verify port number (usually 3306 for MySQL)
- On Render: Database may be in private network, use internal URL

---

### ❌ `Host Not Found (ENOTFOUND)`

**Problem:** Hostname is invalid or can't resolve  
**Fix:**
- Check spelling of hostname
- Verify internet connectivity
- On Render: Check if database service is in the same Render project

---

### ❌ `Connection Timeout (ETIMEDOUT)`

**Problem:** Network is unreachable or timeout  
**Fix:**
- Check firewall rules allow connection
- Verify database server is running
- On Render: May need to add your app to database IP allowlist
- Check network connectivity from Render region

---

### ❌ `Database Does Not Exist (ER_BAD_DB_ERROR)`

**Problem:** Database name in URL doesn't exist  
**Fix:**
```bash
npm run seed
```
This creates the database and initializes all tables.

---

## 🔧 Local Testing

Before deploying to Render, test locally:

```bash
# 1. Check database connection
npm run db:check

# 2. Initialize database and seed data
npm run seed

# 3. Start server with full checks
npm start
```

## 📊 Example Output: Success Case

```
🚀 Starting server...
   NODE_ENV: production
   PORT: 5000

═══════════════════════════════════════════════════════
🔍 DATABASE CONNECTION CHECKER
═══════════════════════════════════════════════════════

✅ DATABASE_URL is set
   URL: mysql://root:***UBJ@hopper.proxy.rlwy.net:46348/railway

✅ DATABASE_URL format is valid

Connection Details:
   Host:     hopper.proxy.rlwy.net
   Port:     46348
   User:     root
   Password: ***UBJ
   Database: railway

🔗 Testing connection...

   ℹ️  Using SSL for remote host connection

✅ Connection successful

🧪 Running diagnostics...

✅ Ping query successful
✅ Database "railway" exists

✅ Database contains 9 tables

   Tables:
      - addresses
      - cart
      - categories
      - order_items
      - orders
      - product_images
      - products
      - users
      - wishlist

✅ All checks passed!

═══════════════════════════════════════════════════════

🔄 Initializing database schema...
   DATABASE_URL: Set (hidden)
📡 Database connection acquired
✅ Database connection established
✅ Database schema initialized successfully
✨ Server running on http://localhost:5000
   API: http://localhost:5000/api
   Health: http://localhost:5000/api/health
```

## 📊 Example Output: Failure Case

```
❌ Connection failed: connect ECONNREFUSED 46348

🔍 Error Diagnostics:

Connection Refused
   • Database server is not running or not listening
   • Check host is correct and port is accessible
   • Verify firewall allows connection on specified port
   • On Render: Verify internal/external port settings
```

## ✅ Commands Summary

```bash
# Test database connectivity (standalone)
npm run db:check

# Initialize database and seed sample data
npm run seed

# Start server (runs db:check automatically)
npm start

# Development mode with auto-reload
npm run dev
```

## 🎯 On Render Deployment

1. **Add Environment Variable:**
   - `DATABASE_URL=mysql://user:password@host:port/database`

2. **Set Start Command (optional but recommended):**
   ```
   npm run db:check && npm start
   ```

3. **Check Deployment Logs** in Render dashboard for clear error messages

4. **If deployment fails, deploy logs will show exactly what the issue is** ✨

---

Need help? The error checker will tell you exactly what's wrong! 🚀
