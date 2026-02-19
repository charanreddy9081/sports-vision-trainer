# Sports Vision Trainer - Deployment Script (PowerShell)
# This script helps prepare your app for deployment

Write-Host "🚀 Sports Vision Trainer - Deployment Preparation" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "⚠️  Git not initialized. Initializing..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

# Check for .env files
Write-Host ""
Write-Host "🔍 Checking environment files..." -ForegroundColor Cyan

if (-not (Test-Path backend/.env)) {
    Write-Host "⚠️  backend/.env not found" -ForegroundColor Yellow
    Write-Host "   Copy backend/.env.example to backend/.env and fill in values"
} else {
    Write-Host "✅ backend/.env exists" -ForegroundColor Green
}

if (-not (Test-Path frontend/.env.local)) {
    Write-Host "⚠️  frontend/.env.local not found" -ForegroundColor Yellow
    Write-Host "   Copy frontend/.env.example to frontend/.env.local and fill in values"
} else {
    Write-Host "✅ frontend/.env.local exists" -ForegroundColor Green
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Installing backend dependencies..."
Set-Location backend
npm install
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "Installing frontend dependencies..."
Set-Location ../frontend
npm install
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

Set-Location ..

# Generate Prisma client
Write-Host ""
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Cyan
Set-Location backend
npx prisma generate
Write-Host "✅ Prisma client generated" -ForegroundColor Green
Set-Location ..

# Build backend
Write-Host ""
Write-Host "🏗️  Building backend..." -ForegroundColor Cyan
Set-Location backend
npm run build
Write-Host "✅ Backend built successfully" -ForegroundColor Green
Set-Location ..

# Build frontend
Write-Host ""
Write-Host "🏗️  Building frontend..." -ForegroundColor Cyan
Set-Location frontend
npm run build
Write-Host "✅ Frontend built successfully" -ForegroundColor Green
Set-Location ..

# Git status
Write-Host ""
Write-Host "📊 Git status:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Commit your changes: git add . ; git commit -m 'Ready for deployment'"
Write-Host "2. Push to GitHub: git push origin main"
Write-Host "3. Follow QUICK_DEPLOY.md for platform-specific deployment"
Write-Host ""
Write-Host "📚 Deployment guides:" -ForegroundColor Cyan
Write-Host "   - QUICK_DEPLOY.md - Quick 15-minute guide"
Write-Host "   - DEPLOYMENT_GUIDE.md - Detailed step-by-step guide"
Write-Host "   - DEPLOYMENT_OPTIONS.md - Compare different platforms"
Write-Host ""
