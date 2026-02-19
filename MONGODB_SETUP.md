# MongoDB Setup Guide

This guide will help you set up MongoDB for the Sports Vision Trainer application.

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create Free MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (choose FREE tier)
4. Wait for cluster to be created (~3-5 minutes)

### Step 2: Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create username and password (save these!)
5. Set privileges to **Atlas admin** or **Read and write to any database**
6. Click **Add User**

### Step 3: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
   - Or add your specific IP address
4. Click **Confirm**

### Step 4: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `sports_vision_trainer` or leave as is

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority
```

### Step 5: Update Backend .env

Update `backend/.env`:
```env
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority"
```

## Option 2: Local MongoDB Installation

### Windows Installation:

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download Windows installer
   - Run installer and follow setup wizard
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)

2. **Verify Installation:**
   ```bash
   mongod --version
   ```

3. **Start MongoDB Service:**
   - MongoDB should start automatically as a Windows service
   - Or start manually: `net start MongoDB`

4. **Update Backend .env:**
   ```env
   DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer"
   ```

### macOS Installation (using Homebrew):

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Update `.env`:
```env
DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer"
```

### Linux Installation:

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 3: Docker (If you have Docker installed)

```bash
docker run --name sports-vision-mongodb -p 27017:27017 -d mongo:latest
```

Update `.env`:
```env
DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer"
```

## After MongoDB Setup:

1. **Generate Prisma Client:**
   ```bash
   cd backend
   npx prisma generate
   ```

2. **Push Schema to Database:**
   ```bash
   npx prisma db push
   ```
   
   Note: MongoDB doesn't use migrations like PostgreSQL. Use `db push` instead of `migrate dev`.

3. **Verify Connection:**
   ```bash
   npx prisma studio
   ```
   This opens a visual database browser at http://localhost:5555

## Troubleshooting

### Connection Error:
- Verify MongoDB is running: `mongosh` or `mongo` command
- Check connection string format
- Verify network access (for Atlas)
- Check firewall settings

### Authentication Error:
- Verify username and password in connection string
- Check database user permissions in Atlas

### Port Already in Use:
- MongoDB default port is 27017
- Check if another MongoDB instance is running
- Change port in connection string if needed

## Quick Test Connection:

```bash
# Using mongosh (MongoDB Shell)
mongosh "mongodb://localhost:27017/sports_vision_trainer"

# Or for Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sports_vision_trainer"
```

If connection succeeds, you'll see MongoDB shell prompt.
