# 🚀 START HERE - Complete Setup Guide

## ✅ What's Already Done:

1. ✓ **Project Structure** - All files created
2. ✓ **Dependencies Installed** - Backend and frontend packages installed
3. ✓ **MongoDB Schema** - Prisma schema updated for MongoDB
4. ✓ **Prisma Client Generated** - Ready for MongoDB
5. ✓ **Environment Files** - Templates created

## 🔧 Final Step: Connect MongoDB

You need to set up MongoDB and update the connection string. Choose one option:

---

## Option 1: MongoDB Atlas (Cloud - RECOMMENDED) ⭐

**Time: 5-10 minutes | Cost: FREE**

### Quick Steps:

1. **Sign Up:** https://www.mongodb.com/cloud/atlas/register
2. **Create Free Cluster:** Choose M0 Sandbox (FREE)
3. **Create Database User:** Database Access → Add User (save password!)
4. **Allow Network Access:** Network Access → Add IP → Allow 0.0.0.0/0
5. **Get Connection String:** Database → Connect → Connect your application
6. **Update backend/.env:** Replace DATABASE_URL with your connection string

**See `COMPLETE_SETUP.md` for detailed step-by-step instructions.**

---

## Option 2: Local MongoDB

**Time: 10-15 minutes | Requires Installation**

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install MongoDB** (Windows installer)
3. **Start MongoDB Service** (usually automatic)
4. **Update backend/.env:**
   ```
   DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer"
   ```

---

## 📋 After MongoDB is Connected:

Run these commands:

```bash
# 1. Push schema to database
cd backend
npx prisma db push

# 2. Start backend server (Terminal 1)
npm run dev

# 3. Start frontend server (Terminal 2 - new terminal)
cd ../frontend
npm run dev
```

## 🎯 Access Your Application:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## ✅ Test It:

1. Open http://localhost:3000
2. Click **Sign Up**
3. Create an account
4. You should see the dashboard!

## 📚 Need Help?

- **COMPLETE_SETUP.md** - Detailed MongoDB Atlas setup
- **MONGODB_SETUP.md** - MongoDB installation guide
- **FINAL_SETUP_INSTRUCTIONS.md** - Quick reference

## 🆘 Troubleshooting:

### "Can't reach database server"
→ MongoDB not running or connection string incorrect

### "EPERM: operation not permitted"
→ Stop servers first (Ctrl+C), then try again

### "Prisma Client not found"
→ Run `cd backend && npx prisma generate`

---

## 🎉 You're Almost There!

Just connect MongoDB and you're ready to go!

**Recommended:** Use MongoDB Atlas (cloud) - it's free and takes 5 minutes.

See `COMPLETE_SETUP.md` for the easiest path! 🚀
