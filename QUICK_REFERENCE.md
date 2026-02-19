# ⚡ Quick Reference Card

## 🚀 Deploy in 3 Steps

### 1. Database (5 min)
```
MongoDB Atlas → Create FREE cluster → Get connection string
```

### 2. Backend (5 min)
```
Render → New Web Service → Connect GitHub → Add env vars → Deploy
```

### 3. Frontend (5 min)
```
Vercel → New Project → Connect GitHub → Add API URL → Deploy
```

**Total Time: 15 minutes**  
**Total Cost: $0/month**

---

## 📚 Essential Guides

| Guide | When to Use |
|-------|-------------|
| [START_DEPLOYMENT.md](./START_DEPLOYMENT.md) | First time deploying |
| [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | Quick deployment |
| [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md) | Before deploying |
| [INDEX.md](./INDEX.md) | Find any document |

---

## 🔑 Environment Variables

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/sports_vision_trainer
JWT_SECRET=32-char-random-string
JWT_REFRESH_SECRET=32-char-random-string
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🛠️ Local Development

### Start Everything
```bash
npm run install:all
npm run dev
```

### Individual Services
```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev
```

---

## 🔧 Useful Commands

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Build for Production
```bash
npm run build
```

### Verify Setup
```bash
./verify-setup.ps1  # Windows
./verify-setup.sh   # Mac/Linux
```

### Prepare Deployment
```bash
./deploy.ps1  # Windows
./deploy.sh   # Mac/Linux
```

---

## 🌐 Platform URLs

### Sign Up (All Free)
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
- Render: https://dashboard.render.com/register
- Vercel: https://vercel.com/signup

### Dashboards
- MongoDB: https://cloud.mongodb.com
- Render: https://dashboard.render.com
- Vercel: https://vercel.com/dashboard

---

## 🆘 Quick Troubleshooting

### Backend won't start
```
1. Check DATABASE_URL
2. Verify MongoDB allows 0.0.0.0/0
3. Check Render logs
```

### Frontend can't connect
```
1. Verify NEXT_PUBLIC_API_URL
2. Update FRONTEND_URL in backend
3. Check browser console
```

### Database connection fails
```
1. Test connection string locally
2. Check MongoDB user password
3. Verify network access
```

---

## 📊 Health Checks

### Backend
```
https://your-backend.onrender.com/health
```

### Frontend
```
https://your-app.vercel.app
```

---

## 🎯 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set
- [ ] Health checks pass
- [ ] Can create account
- [ ] Can login
- [ ] Training modules work

---

## 💡 Pro Tips

1. **First request slow?** - Render free tier sleeps after 15 min
2. **Generate secrets** - Use crypto.randomBytes(32)
3. **Monitor usage** - Check platform dashboards
4. **Backup data** - Export from MongoDB Atlas
5. **Update regularly** - Keep dependencies current

---

## 📱 Your URLs

After deployment, save these:

```
Frontend: https://_________________.vercel.app
Backend:  https://_________________.onrender.com
Database: MongoDB Atlas Dashboard
```

---

## 🔗 Quick Links

- 🚀 [Deploy Now](./START_DEPLOYMENT.md)
- 📖 [All Docs](./INDEX.md)
- ✅ [Checklist](./PRE_DEPLOYMENT_CHECKLIST.md)
- 🎯 [Features](./FEATURES.md)
- 📊 [API Docs](./API_DOCUMENTATION.md)

---

## 📞 Support

### Documentation
- [INDEX.md](./INDEX.md) - Find any guide
- [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - What's configured
- [CHANGES_MADE.md](./CHANGES_MADE.md) - What changed

### Common Issues
- Check deployment guide troubleshooting sections
- Review platform logs
- Verify environment variables

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Local setup | 15 min |
| Database setup | 5 min |
| Backend deploy | 5 min |
| Frontend deploy | 5 min |
| Testing | 5 min |
| **Total** | **35 min** |

---

## 💰 Costs

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| MongoDB Atlas | 512 MB | $9/mo |
| Render | 750 hrs | $7/mo |
| Vercel | 100 GB | $20/mo |
| **Total** | **$0/mo** | **$36/mo** |

---

## 🎉 Success!

Once deployed:
1. ✅ App is live worldwide
2. ✅ Zero monthly cost
3. ✅ Automatic deployments
4. ✅ SSL/HTTPS enabled
5. ✅ Global CDN delivery

---

**Ready to deploy?** → [START_DEPLOYMENT.md](./START_DEPLOYMENT.md)

**Need help?** → [INDEX.md](./INDEX.md)
