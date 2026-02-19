# 🎯 START HERE - Deployment Guide

Welcome! This guide will help you deploy your Sports Vision Trainer app for FREE in 3 simple steps.

---

## 🎬 Before You Start

### What You'll Need (All Free!)
1. **GitHub Account** - [Sign up](https://github.com/signup)
2. **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas/register)
3. **Render Account** - [Sign up](https://dashboard.render.com/register)
4. **Vercel Account** - [Sign up](https://vercel.com/signup)

### Time Required
⏱️ 15-20 minutes total

---

## 📋 Step 1: Verify Your Setup (2 min)

Run the verification script:

**Windows (PowerShell):**
```powershell
./verify-setup.ps1
```

**Mac/Linux:**
```bash
chmod +x deploy.sh
./verify-setup.sh
```

Fix any errors before continuing.

---

## 🗄️ Step 2: Setup Database (5 min)

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Build a Database"
3. Choose **FREE** tier (M0 Sandbox)
4. Select region closest to you
5. Click "Create"

### Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `sportsadmin`
4. Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD**
5. Select "Read and write to any database"
6. Click "Add User"

### Allow Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"

### Get Connection String

1. Go to "Database"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your saved password
6. Replace `<dbname>` with `sports_vision_trainer`

**Your connection string should look like:**
```
mongodb+srv://sportsadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority
```

**SAVE THIS STRING** - You'll need it soon!

---

## 🚀 Step 3: Deploy Your App (10 min)

### A. Push to GitHub (2 min)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for deployment"
git branch -M main

# Create a new repository on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### B. Deploy Backend to Render (4 min)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `sports-vision-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `cd backend && npm install && npx prisma generate && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: **Free**

5. Click "Advanced" → Add Environment Variables:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=YOUR_MONGODB_CONNECTION_STRING_FROM_STEP_2
JWT_SECRET=PASTE_RANDOM_STRING_HERE
JWT_REFRESH_SECRET=PASTE_ANOTHER_RANDOM_STRING_HERE
FRONTEND_URL=https://your-app.vercel.app
```

**Generate JWT Secrets:**
Run this twice to get two different secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. **COPY YOUR BACKEND URL** (e.g., `https://sports-vision-backend.onrender.com`)

### C. Deploy Frontend to Vercel (4 min)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`

5. Add Environment Variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: YOUR_BACKEND_URL_FROM_RENDER

6. Click "Deploy"
7. Wait 2-5 minutes
8. **COPY YOUR FRONTEND URL** (e.g., `https://sports-vision-trainer.vercel.app`)

### D. Update Backend URL

1. Go back to Render dashboard
2. Find your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL` with your Vercel URL
5. Save changes (service will redeploy)

---

## ✅ Step 4: Test Your Deployment (2 min)

### Test Backend
Visit: `https://your-backend-url.onrender.com/health`

Should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production",
  "database": "connected"
}
```

### Test Frontend
1. Visit your Vercel URL
2. Click "Sign Up"
3. Create a test account
4. Login
5. Try a training module
6. Check leaderboard

---

## 🎉 Success!

Your app is now live and accessible worldwide!

### Your URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas Dashboard

### Share Your App
Send your Vercel URL to friends and start training!

---

## 🆘 Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify DATABASE_URL is correct
- Ensure MongoDB allows connections from anywhere

### Frontend can't connect to backend
- Verify NEXT_PUBLIC_API_URL in Vercel
- Check FRONTEND_URL in Render
- Look at browser console for errors

### Database connection fails
- Test connection string locally
- Verify MongoDB user password
- Check network access settings

### Still stuck?
Check these detailed guides:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed instructions
- [DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md) - Alternative platforms
- [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md) - Checklist

---

## 📊 What's Next?

### Monitor Your App
- **Render**: Check logs and metrics
- **Vercel**: View analytics and deployments
- **MongoDB Atlas**: Monitor database usage

### Upgrade When Needed
All platforms offer paid tiers when you outgrow free limits:
- MongoDB Atlas: $9/month for M10
- Render: $7/month for always-on
- Vercel: $20/month for Pro features

### Add Features
- Email notifications
- Payment integration
- Social sharing
- Mobile app

---

## 💡 Tips

1. **First request may be slow** - Render free tier sleeps after 15 min inactivity
2. **Monitor usage** - Stay within free tier limits
3. **Backup data** - Export from MongoDB Atlas regularly
4. **Update regularly** - Keep dependencies up to date
5. **Use environment variables** - Never hardcode secrets

---

## 🎯 Quick Reference

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Backend Locally
```bash
cd backend
npm run dev
```

### Test Frontend Locally
```bash
cd frontend
npm run dev
```

### View Logs
- **Render**: Dashboard → Your Service → Logs
- **Vercel**: Dashboard → Your Project → Deployments → View Function Logs

---

## ✨ Congratulations!

You've successfully deployed a full-stack application for FREE!

Now go train and improve your eye-hand coordination! 🎯

---

**Need help?** Check the other guides in this repository or open an issue on GitHub.
