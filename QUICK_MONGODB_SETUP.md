# Quick MongoDB Atlas Setup (5 minutes)

## Step 1: Create MongoDB Atlas Account

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google/GitHub or email
3. Choose **FREE** tier (M0 Sandbox)

## Step 2: Create Cluster

1. Choose **AWS** as cloud provider
2. Select a region close to you
3. Click **Create Cluster**
4. Wait 3-5 minutes for cluster creation

## Step 3: Create Database User

1. Click **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `sportsvision` (or your choice)
5. Password: Create a strong password (SAVE THIS!)
6. Privileges: **Atlas admin**
7. Click **Add User**

## Step 4: Configure Network Access

1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

## Step 5: Get Connection String

1. Click **Database** (left sidebar)
2. Click **Connect** button on your cluster
3. Choose **Connect your application**
4. Copy the connection string

It looks like:
```
mongodb+srv://sportsvision:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Update Backend .env

1. Open `backend/.env`
2. Replace `<password>` with your database user password
3. Add database name: `sports_vision_trainer` before `?`

Final format:
```
DATABASE_URL="mongodb+srv://sportsvision:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sports_vision_trainer?retryWrites=true&w=majority"
```

## Step 7: Generate Prisma Client & Push Schema

```bash
cd backend
npx prisma generate
npx prisma db push
```

## Step 8: Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## Done! 🎉

Your app should now be running:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
