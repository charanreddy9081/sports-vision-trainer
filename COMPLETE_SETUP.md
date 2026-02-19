# Complete MongoDB Setup - Step by Step

## 🚀 Quick Setup (5-10 minutes)

### Step 1: Create MongoDB Atlas Account (2 minutes)

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Click **Sign up with Google** (fastest) or use email

2. **Create Free Cluster:**
   - After signup, click **Build a Database**
   - Choose **FREE** (M0 Sandbox) - $0/month
   - Select **AWS** as provider
   - Choose a region (closest to you)
   - Click **Create**

3. **Wait for cluster** (3-5 minutes) - You'll see "Your deployment is ready"

### Step 2: Configure Database Access (1 minute)

1. Click **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Authentication Method: **Password**
4. Username: `sportsvision` (or your choice)
5. Password: **Create a strong password** ⚠️ **SAVE THIS!**
6. Database User Privileges: **Atlas admin**
7. Click **Add User**

### Step 3: Configure Network Access (1 minute)

1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
   - This allows connection from any IP (safe for development)
4. Click **Confirm**

### Step 4: Get Connection String (1 minute)

1. Click **Database** (left sidebar)
2. Click **Connect** button on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**, Version: **5.5 or later**
5. **Copy the connection string**

It will look like:
```
mongodb+srv://sportsvision:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 5: Update Backend Configuration

1. Open `backend/.env` file
2. Replace the entire `DATABASE_URL` line with:
   ```
   DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority"
   ```
3. Replace:
   - `YOUR_USERNAME` with your database username (e.g., `sportsvision`)
   - `YOUR_PASSWORD` with your database password
   - `cluster0.xxxxx.mongodb.net` with your actual cluster URL
   - Add `/sports_vision_trainer` before the `?` (database name)

**Example:**
```
DATABASE_URL="mongodb+srv://sportsvision:MySecurePass123@cluster0.abc123.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority"
```

### Step 6: Generate Prisma Client & Push Schema

Open terminal in the project root and run:

```bash
cd backend
npx prisma generate
npx prisma db push
```

You should see:
- ✓ Generated Prisma Client
- ✓ Database schema pushed successfully

### Step 7: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 8: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## ✅ Verification

1. Open http://localhost:3000
2. Click **Sign Up**
3. Create an account
4. You should be redirected to the dashboard

If everything works, you're all set! 🎉

## 🔧 Troubleshooting

### Connection Error
- Verify your connection string in `backend/.env`
- Check username/password are correct
- Ensure Network Access allows 0.0.0.0/0
- Wait a few minutes after creating cluster

### Prisma Generate Error
- Make sure MongoDB Atlas cluster is ready
- Verify DATABASE_URL format is correct
- Check internet connection

### Database Push Error
- Verify connection string
- Check if cluster is fully deployed (wait 5 minutes)
- Ensure database user has proper permissions

## 📝 Need Help?

- Check `MONGODB_SETUP.md` for detailed instructions
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Prisma MongoDB Docs: https://www.prisma.io/docs/concepts/database-connectors/mongodb
