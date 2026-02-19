# ✅ Pre-Deployment Checklist

Complete this checklist before deploying to production.

---

## 🔐 Security

- [ ] Changed all default secrets in `.env` files
- [ ] JWT_SECRET is 32+ characters long
- [ ] JWT_REFRESH_SECRET is 32+ characters long
- [ ] No `.env` files committed to git
- [ ] Database credentials are secure
- [ ] CORS origins are properly configured
- [ ] Rate limiting is enabled

---

## 📝 Environment Variables

### Backend
- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` (MongoDB Atlas connection string)
- [ ] `JWT_SECRET` (strong random string)
- [ ] `JWT_REFRESH_SECRET` (strong random string)
- [ ] `FRONTEND_URL` (your Vercel URL)
- [ ] `PORT` (10000 for Render)

### Frontend
- [ ] `NEXT_PUBLIC_API_URL` (your backend URL)

---

## 🗄️ Database

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access allows 0.0.0.0/0
- [ ] Connection string tested locally
- [ ] Database name is `sports_vision_trainer`

---

## 📦 Code

- [ ] All dependencies installed
- [ ] Backend builds successfully (`npm run build`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Prisma client generated
- [ ] No TypeScript errors
- [ ] No console errors in browser

---

## 🔧 Configuration Files

- [ ] `vercel.json` exists
- [ ] `render.yaml` exists
- [ ] `package.json` has correct scripts
- [ ] `tsconfig.json` is properly configured
- [ ] `.gitignore` excludes sensitive files

---

## 🌐 Git & GitHub

- [ ] Code pushed to GitHub
- [ ] Repository is public or accessible
- [ ] `.env` files are in `.gitignore`
- [ ] All changes committed
- [ ] Main branch is up to date

---

## 🚀 Platform Accounts

- [ ] GitHub account ready
- [ ] MongoDB Atlas account created
- [ ] Render/Railway account created
- [ ] Vercel account created

---

## 🧪 Testing

- [ ] Backend health check works (`/health`)
- [ ] Can create new user account
- [ ] Can login successfully
- [ ] Training modules work
- [ ] Leaderboard displays
- [ ] Analytics dashboard shows data
- [ ] Admin panel accessible (for admin users)

---

## 📱 Production URLs

After deployment, record these:

```
Frontend URL: https://_____________________.vercel.app
Backend URL:  https://_____________________.onrender.com
Database:     MongoDB Atlas Dashboard
```

---

## 🔄 Deployment Steps

1. [ ] Complete all items above
2. [ ] Run `./deploy.sh` or `deploy.ps1`
3. [ ] Push to GitHub
4. [ ] Deploy backend to Render
5. [ ] Deploy frontend to Vercel
6. [ ] Update environment variables
7. [ ] Test production deployment
8. [ ] Monitor logs for errors

---

## 📊 Post-Deployment

- [ ] Frontend loads without errors
- [ ] Backend responds to requests
- [ ] Database connections work
- [ ] Authentication works
- [ ] All features functional
- [ ] No console errors
- [ ] Performance is acceptable

---

## 🆘 Troubleshooting

If something doesn't work:

1. Check environment variables
2. Review deployment logs
3. Test database connection
4. Verify CORS settings
5. Check browser console
6. Review backend logs

---

## 📚 Resources

- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick deployment guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed guide
- [DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md) - Platform comparison

---

## ✅ Ready to Deploy?

Once all items are checked, you're ready to deploy!

Run: `./deploy.sh` (or `deploy.ps1` on Windows)

Then follow: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
