# Quick Start Guide

Get the Sports Vision Trainer up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git (optional)

## Step 1: Database Setup

### Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a database:
```sql
CREATE DATABASE sports_vision_trainer;
```

### Cloud Database (Quick Option)

Use a free PostgreSQL service:
- [Supabase](https://supabase.com) - Free tier available
- [Railway](https://railway.app) - Free tier available
- [Neon](https://neon.tech) - Free tier available

Copy the connection string.

## Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and add your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/sports_vision_trainer"

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run dev
```

Backend should now be running on `http://localhost:5000`

## Step 3: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start the development server
npm run dev
```

Frontend should now be running on `http://localhost:3000`

## Step 4: Test the Application

1. Open `http://localhost:3000` in your browser
2. Click "Sign Up" to create an account
3. Fill in the registration form
4. You'll be redirected to the dashboard
5. Try a training module!

## Common Issues

### Database Connection Error

**Problem:** `Can't reach database server`

**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` is correct
- Ensure database exists
- Check firewall settings

### Port Already in Use

**Problem:** `Port 5000 is already in use`

**Solution:**
- Change PORT in backend `.env` file
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local` to match

### Prisma Migration Error

**Problem:** `Migration failed`

**Solution:**
- Ensure database is accessible
- Check DATABASE_URL format
- Try: `npx prisma migrate reset` (WARNING: deletes all data)

### CORS Error

**Problem:** `CORS policy blocked`

**Solution:**
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Ensure `NEXT_PUBLIC_API_URL` in frontend matches backend URL
- Restart both servers

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

## Development Tips

### Backend

- View database: `npx prisma studio` (opens at http://localhost:5555)
- Reset database: `npx prisma migrate reset`
- Create migration: `npx prisma migrate dev --name migration_name`

### Frontend

- Hot reload is enabled automatically
- Check browser console for errors
- Use React DevTools for debugging

## Need Help?

- Check the logs in terminal
- Review error messages carefully
- Ensure all environment variables are set
- Verify database connection

Happy coding! 🚀
