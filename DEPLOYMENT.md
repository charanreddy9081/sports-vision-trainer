# Deployment Guide

This guide will walk you through deploying the Sports Vision Trainer application to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- Supabase or Railway account (for database)

## Step 1: Database Setup

### Option A: Supabase

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (URI format)
5. Update the connection string with your password

### Option B: Railway

1. Go to [railway.app](https://railway.app) and create an account
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string from the Variables tab

### Run Migrations

```bash
cd backend
npx prisma migrate deploy
```

This will create all tables in your production database.

## Step 2: Backend Deployment (Render)

1. **Create Web Service**
   - Go to Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Build Settings**
   - **Name**: `sports-vision-trainer-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://sports-vision-trainer-api.onrender.com`)

## Step 3: Frontend Deployment (Vercel)

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

## Step 4: Update CORS Settings

After deployment, update your backend `FRONTEND_URL` environment variable to match your Vercel URL:

```
FRONTEND_URL=https://your-project.vercel.app
```

Redeploy the backend for changes to take effect.

## Step 5: Verify Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Visit `https://your-backend-url.onrender.com/health`
3. **Test Authentication**: Try signing up and logging in
4. **Test Training**: Complete a training session
5. **Test Analytics**: Check if data is being saved and displayed

## Environment Variables Summary

### Backend (Render)
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if database allows connections from Render IPs
- Ensure SSL is enabled if required

### CORS Errors
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Check for trailing slashes
- Ensure backend is redeployed after changing `FRONTEND_URL`

### Build Failures
- Check build logs in Render/Vercel
- Verify all dependencies are in `package.json`
- Ensure TypeScript compiles without errors

### Authentication Issues
- Verify JWT secrets are set correctly
- Check cookie settings (secure, sameSite)
- Ensure HTTPS is enabled in production

## Production Checklist

- [ ] Database migrations run successfully
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Monitoring set up
- [ ] Backup strategy in place

## Monitoring

### Render
- View logs in the Render dashboard
- Set up alerts for service downtime
- Monitor resource usage

### Vercel
- View analytics in Vercel dashboard
- Check function logs
- Monitor performance metrics

## Scaling

### Database
- Upgrade database plan as needed
- Consider connection pooling
- Monitor query performance

### Backend
- Enable auto-scaling in Render
- Monitor response times
- Set up load balancing if needed

### Frontend
- Vercel automatically scales
- Monitor bandwidth usage
- Optimize images and assets

## Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT secrets** (32+ characters)
3. **Enable HTTPS** (automatic on Vercel/Render)
4. **Regularly update dependencies**
5. **Monitor for security vulnerabilities**
6. **Use environment-specific configurations**

## Support

For issues or questions:
- Check the logs in Render/Vercel dashboards
- Review the README.md for setup instructions
- Check Prisma documentation for database issues
