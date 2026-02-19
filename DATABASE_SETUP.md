# Database Setup Guide

The application requires a PostgreSQL database. Here are your options:

## Option 1: Local PostgreSQL (Recommended for Development)

### Windows Installation:

1. **Download PostgreSQL:**
   - Visit: https://www.postgresql.org/download/windows/
   - Download and install PostgreSQL (includes pgAdmin)

2. **During Installation:**
   - Remember the password you set for the `postgres` user
   - Default port is 5432

3. **Create Database:**
   - Open pgAdmin or use psql command line
   - Create a new database named `sports_vision_trainer`

4. **Update .env file:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sports_vision_trainer?schema=public"
   ```
   Replace `YOUR_PASSWORD` with your PostgreSQL password

5. **Run Migrations:**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

## Option 2: Cloud Database (Easiest - No Installation)

### Supabase (Free Tier):

1. Go to https://supabase.com
2. Sign up for free account
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string (URI format)
6. Update `backend/.env`:
   ```env
   DATABASE_URL="your-supabase-connection-string"
   ```
7. Run migrations:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

### Railway (Free Tier):

1. Go to https://railway.app
2. Sign up and create new project
3. Add PostgreSQL service
4. Copy connection string from Variables tab
5. Update `backend/.env` and run migrations

## Option 3: Docker (If you have Docker installed)

```bash
docker run --name sports-vision-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sports_vision_trainer -p 5432:5432 -d postgres
```

Then update `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sports_vision_trainer?schema=public"
```

## After Database Setup:

Once your database is configured, run:

```bash
cd backend
npx prisma migrate dev --name init
```

This will create all the necessary tables.

## Verify Database Connection:

```bash
cd backend
npx prisma studio
```

This opens a visual database browser at http://localhost:5555
