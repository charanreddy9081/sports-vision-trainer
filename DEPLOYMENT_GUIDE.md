# 🚀 Free Deployment Guide

This guide will help you deploy the Sports Vision Trainer application completely free using:
- **MongoDB Atlas** (Database - Free tier)
- **Render/Railway** (Backend - Free tier)
- **Vercel** (Frontend - Free tier)

## Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Vercel account (free)
- Render or Railway account (free)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create Free Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Click "Build a Database"
4. Select **FREE** tier (M0 Sandbox)
5. Choose a cloud provider and region (closest to you)
6. Name your cluster (e.g., "sports-vision")
7. Click "Create"

### 1.2 Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `sportsadmin` (or your choice)
5. Generate a secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.3 Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.4 Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `sports_vision_trainer`

Example:
```
mongodb+srv://sportsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend (Render or Railway)

### Option A: Render (Recommended)

#### 2.1 Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

#### 2.2 Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `sports-vision-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install && npx prisma generate && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

#### 2.3 Add Environment Variables
Click "Advanced" → "Add Environment Variable":

```
NODE_ENV=production
PORT=10000
DATABASE_URL=mongodb+srv://sportsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars-long
FRONTEND_URL=https://your-app.vercel.app
```

**Important**: Generate strong secrets (32+ characters)

#### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://sports-vision-backend.onrender.com`)

### Option B: Railway

#### 2.1 Deploy to Railway
1. Go to [Railway](https://railway.app/)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js

#### 2.2 Configure Environment Variables
Add these variables in Railway dashboard:

```
NODE_ENV=production
DATABASE_URL=mongodb+srv://sportsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars-long
FRONTEND_URL=https://your-app.vercel.app
```

#### 2.3 Configure Build
1. Go to Settings
2. Set Root Directory: `backend`
3. Build Command: `npm install && npx prisma generate && npm run build`
4. Start Command: `npm start`

#### 2.4 Deploy
Railway will automatically deploy. Copy your backend URL.

---

## Step 3: Deploy Frontend (Vercel)

### 3.1 Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3.2 Add Environment Variable
Click "Environment Variables":

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

Replace with your actual backend URL from Step 2.

### 3.3 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Copy your frontend URL (e.g., `https://sports-vision-trainer.vercel.app`)

### 3.4 Update Backend FRONTEND_URL
Go back to Render/Railway and update the `FRONTEND_URL` environment variable with your Vercel URL.

---

## Step 4: Verify Deployment

### 4.1 Test Backend
Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Try signing up with a new account
3. Test login
4. Try a training module

---

## 🎯 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Backend health check returns OK
- [ ] Frontend loads without errors
- [ ] Can create new account
- [ ] Can login successfully
- [ ] Training modules work
- [ ] Leaderboard displays
- [ ] Analytics dashboard shows data

---

## 🔧 Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Verify DATABASE_URL is correct
- Check Render/Railway logs for errors
- Ensure MongoDB Atlas allows connections from anywhere

### Frontend can't connect to backend
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure FRONTEND_URL in backend matches Vercel URL
- Check browser console for errors

### Database connection fails
- Verify MongoDB Atlas user credentials
- Check Network Access allows 0.0.0.0/0
- Ensure connection string has correct password
- Test connection string locally first

### JWT errors
- Ensure JWT_SECRET and JWT_REFRESH_SECRET are set
- Secrets should be 32+ characters
- Don't use default example secrets

---

## 💰 Free Tier Limits

### MongoDB Atlas (Free)
- 512 MB storage
- Shared RAM
- No backup
- Good for: Development, small apps

### Render (Free)
- 750 hours/month
- Spins down after 15 min inactivity
- 512 MB RAM
- Good for: Side projects, demos

### Railway (Free)
- $5 credit/month
- ~500 hours runtime
- Good for: Small projects

### Vercel (Free)
- 100 GB bandwidth/month
- Unlimited deployments
- Good for: Most projects

---

## 🚀 Upgrade Path

When you outgrow free tiers:

1. **MongoDB Atlas**: $9/month for M10 cluster
2. **Render**: $7/month for always-on service
3. **Railway**: $5/month for more credits
4. **Vercel**: $20/month for Pro features

---

## 📝 Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=min-32-character-secret-key
JWT_REFRESH_SECRET=min-32-character-refresh-key
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🎉 Success!

Your Sports Vision Trainer is now deployed and accessible worldwide for free!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Database: MongoDB Atlas

Share your app and start training! 🎯
