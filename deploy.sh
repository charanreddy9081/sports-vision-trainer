#!/bin/bash

# Sports Vision Trainer - Deployment Script
# This script helps prepare your app for deployment

set -e

echo "🚀 Sports Vision Trainer - Deployment Preparation"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Initializing...${NC}"
    git init
    git branch -M main
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "${GREEN}✅ Git already initialized${NC}"
fi

# Check for .env files
echo ""
echo "🔍 Checking environment files..."

if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found${NC}"
    echo "   Copy backend/.env.example to backend/.env and fill in values"
else
    echo -e "${GREEN}✅ backend/.env exists${NC}"
fi

if [ ! -f frontend/.env.local ]; then
    echo -e "${YELLOW}⚠️  frontend/.env.local not found${NC}"
    echo "   Copy frontend/.env.example to frontend/.env.local and fill in values"
else
    echo -e "${GREEN}✅ frontend/.env.local exists${NC}"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
echo ""

echo "Installing backend dependencies..."
cd backend
npm install
echo -e "${GREEN}✅ Backend dependencies installed${NC}"

echo ""
echo "Installing frontend dependencies..."
cd ../frontend
npm install
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"

cd ..

# Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate
echo -e "${GREEN}✅ Prisma client generated${NC}"
cd ..

# Build backend
echo ""
echo "🏗️  Building backend..."
cd backend
npm run build
echo -e "${GREEN}✅ Backend built successfully${NC}"
cd ..

# Build frontend
echo ""
echo "🏗️  Building frontend..."
cd frontend
npm run build
echo -e "${GREEN}✅ Frontend built successfully${NC}"
cd ..

# Git status
echo ""
echo "📊 Git status:"
git status --short

echo ""
echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Ready for deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. Follow QUICK_DEPLOY.md for platform-specific deployment"
echo ""
echo "📚 Deployment guides:"
echo "   - QUICK_DEPLOY.md - Quick 15-minute guide"
echo "   - DEPLOYMENT_GUIDE.md - Detailed step-by-step guide"
echo "   - DEPLOYMENT_OPTIONS.md - Compare different platforms"
echo ""
