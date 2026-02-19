# Sports Vision Trainer – Eye-Hand Coordination Training Platform

A full-stack web application that helps athletes improve eye-hand coordination using interactive visual drills, reaction-time games, tracking exercises, and performance analytics.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

### Deploy to Production (FREE)
```bash
# Prepare for deployment
./deploy.sh  # or deploy.ps1 on Windows

# Follow the guide
See QUICK_DEPLOY.md for 15-minute deployment
```

---

## 🌐 Free Deployment

Deploy completely FREE using:
- **MongoDB Atlas** (Database)
- **Render** (Backend)
- **Vercel** (Frontend)

📖 **Deployment Guides:**
- [START_DEPLOYMENT.md](./START_DEPLOYMENT.md) - Complete walkthrough (20 min)
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick start (15 min)
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick reference card
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed instructions
- [DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md) - Compare platforms
- [INDEX.md](./INDEX.md) - All documentation

---

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Role-Based Access**: User and Admin roles
- **Interactive Training Modules**:
  - Reaction Time Test
  - Moving Target Tracking
  - Color Recognition Speed
  - Random Target Hit Game
- **Real-Time Performance Tracking**: Measure reaction times, accuracy, and scores
- **Analytics Dashboard**: Visual charts showing performance trends
- **Leaderboard**: Global ranking system
- **Subscription System**: Free and Pro plans
- **Admin Panel**: User management and platform analytics
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme UI**: Modern glassmorphism design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Chart.js** (analytics)
- **React Hook Form + Zod** (validation)

### Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **JWT** (authentication)
- **bcrypt** (password hashing)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

## 🔧 Installation

### Quick Start (Local Development)

```bash
# Install all dependencies
npm run install:all

# Start both servers
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Detailed Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd "website 2"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sports_vision_trainer?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, rate limiting
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities (JWT, password, Prisma)
│   │   └── server.ts        # Express server
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
├── frontend/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── context/             # React context providers
│   ├── lib/                 # API client, utilities
│   ├── types/               # TypeScript types
│   └── package.json
│
└── README.md
```

## 🗄️ Database Schema

### Models

- **User**: User accounts with authentication
- **Session**: Refresh token sessions
- **TrainingSession**: Training session records
- **Leaderboard**: User rankings
- **Subscription**: Subscription records

See `backend/prisma/schema.prisma` for full schema details.

## 🔐 Authentication Flow

1. **Signup**: User creates account → Password hashed → JWT tokens generated → Stored in HTTP-only cookies
2. **Login**: Credentials verified → JWT tokens generated → Stored in HTTP-only cookies
3. **Protected Routes**: Access token verified → User data attached to request
4. **Token Refresh**: Refresh token used to get new access token

## 📡 API Routes

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Training
- `POST /api/training/create` - Create training session
- `GET /api/training/user/:id` - Get user's training sessions
- `GET /api/training/stats` - Get training statistics

### Leaderboard
- `GET /api/leaderboard` - Get top 10 users

### Subscription
- `POST /api/subscription/upgrade` - Upgrade subscription
- `GET /api/subscription/status` - Get subscription status

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/user/:id` - Delete user
- `GET /api/admin/analytics` - Get platform analytics

## 🎮 Training Modules

### 1. Reaction Time Test
- Random colors appear on screen
- User clicks as fast as possible
- 10 rounds
- Records average reaction time

### 2. Moving Target Tracking
- Targets move randomly on canvas
- User clicks moving targets
- Speed increases over time
- 30-second timer

### 3. Color Recognition Speed
- Target color displayed
- User matches from 4 options
- 20 rounds with 60-second timer
- Measures accuracy

### 4. Random Target Hit
- Targets appear randomly
- User clicks before they disappear
- 2-second target lifetime
- 30-second game duration

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL` (your backend URL)
4. Deploy

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
6. Deploy

### Database (Supabase/Railway)

1. Create PostgreSQL database
2. Get connection string
3. Run migrations: `npx prisma migrate deploy`
4. Update `DATABASE_URL` in backend environment

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## 🔒 Security Features

- JWT tokens in HTTP-only cookies
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- Input validation with Zod
- CORS configuration
- Role-based access control
- CSRF protection ready

## 📊 Performance Features

- Optimized database queries
- Efficient session management
- Client-side caching
- Responsive design
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Sports Vision Trainer Development Team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Chart.js for beautiful charts
- Framer Motion for smooth animations
