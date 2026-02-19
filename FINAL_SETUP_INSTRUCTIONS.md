# Final Setup Instructions - MongoDB

## ✅ What's Already Done:

1. ✓ Project structure created
2. ✓ Dependencies installed
3. ✓ Prisma schema updated for MongoDB
4. ✓ Backend .env configured (template)
5. ✓ Frontend .env.local configured

## 🔧 What You Need to Do:

### Option A: MongoDB Atlas (Recommended - 5 minutes)

1. **Create MongoDB Atlas Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (use Google for fastest setup)
   - Create FREE cluster (M0 Sandbox)
   - Wait 3-5 minutes for cluster creation

2. **Configure Database:**
   - **Database Access:** Create user (username + password)
   - **Network Access:** Allow 0.0.0.0/0 (all IPs)
   - **Get Connection String:** Database → Connect → Connect your application

3. **Update backend/.env:**
   ```
   DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority"
   ```

4. **Complete Setup:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

5. **Start Servers:**
   ```bash
   # Terminal 1
   cd backend
   npm run dev
   
   # Terminal 2
   cd frontend
   npm run dev
   ```

### Option B: Local MongoDB

1. **Install MongoDB:**
   - Download: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Update backend/.env:**
   ```
   DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer"
   ```

3. **Complete Setup:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

4. **Start Servers** (same as above)

## 📋 Quick Commands:

```bash
# Generate Prisma Client
cd backend
npx prisma generate

# Push Schema to Database
npx prisma db push

# Start Backend
npm run dev

# Start Frontend (new terminal)
cd ../frontend
npm run dev
```

## 🎯 Access Application:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

## 📚 Detailed Guides:

- **COMPLETE_SETUP.md** - Step-by-step MongoDB Atlas setup
- **MONGODB_SETUP.md** - Detailed MongoDB installation guide
- **QUICK_MONGODB_SETUP.md** - Quick reference

## ⚠️ Troubleshooting:

### "EPERM: operation not permitted"
- Stop running servers first (Ctrl+C in terminals)
- Then run `npx prisma generate` again

### "Can't reach database server"
- Check MongoDB is running (local) or cluster is ready (Atlas)
- Verify connection string in backend/.env
- Check network access (for Atlas)

### "Prisma Client not generated"
- Make sure you're in the `backend` directory
- Run `npm install` if needed
- Check Prisma schema is valid

## ✅ Verification:

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create account
4. Should redirect to dashboard

If this works, everything is set up correctly! 🎉
