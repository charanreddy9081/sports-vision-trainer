# ⚡ Quick Deploy Checklist

Deploy your Sports Vision Trainer in 15 minutes!

## 🎯 Prerequisites
- [ ] GitHub account
- [ ] MongoDB Atlas account (free)
- [ ] Vercel account (free)
- [ ] Render account (free)

---

## 📋 Step-by-Step

### 1️⃣ Database (5 min)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE cluster
3. Add database user
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string
   ```
   mongodb+srv://user:pass@cluster.mongodb.net/sports_vision_trainer
   ```

### 2️⃣ Push to GitHub (2 min)
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 3️⃣ Backend - Render (5 min)
1. Go to [Render](https://dashboard.render.com/)
2. New Web Service → Connect GitHub repo
3. Settings:
   - Name: `sports-vision-backend`
   - Build: `cd backend && npm install && npx prisma generate && npm run build`
   - Start: `cd backend && npm start`
   - Plan: **Free**

4. Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=mongodb+srv://...
   JWT_SECRET=random-32-char-string
   JWT_REFRESH_SECRET=another-random-32-char-string
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. Deploy → Copy backend URL

### 4️⃣ Frontend - Vercel (3 min)
1. Go to [Vercel](https://vercel.com/dashboard)
2. New Project → Import GitHub repo
3. Settings:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`

4. Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

5. Deploy → Copy frontend URL

### 5️⃣ Update Backend URL
Go back to Render and update `FRONTEND_URL` with your Vercel URL

---

## ✅ Test Your Deployment

1. Visit your Vercel URL
2. Sign up with test account
3. Try a training module
4. Check leaderboard

---

## 🔑 Generate Secure Secrets

Run this in terminal to generate JWT secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run twice to get two different secrets.

---

## 🚨 Common Issues

### Backend won't start
- Check DATABASE_URL is correct
- Verify MongoDB allows connections
- Check Render logs

### Frontend can't connect
- Verify NEXT_PUBLIC_API_URL is correct
- Update FRONTEND_URL in backend
- Check browser console

### Database errors
- Test connection string locally
- Verify user credentials
- Check network access settings

---

## 📱 Your Live URLs

After deployment, save these:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas Dashboard

---

## 🎉 Done!

Your app is now live and accessible worldwide for FREE!

Need detailed instructions? See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
