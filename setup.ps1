# Sports Vision Trainer - Complete Setup Script
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sports Vision Trainer Setup" -ForegroundColor Cyan
Write-Host "  MongoDB Configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
$envPath = "backend\.env"
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    Write-Host "✓ Backend .env file found" -ForegroundColor Green
    
    # Check if DATABASE_URL is configured
    if ($envContent -match 'DATABASE_URL="mongodb') {
        Write-Host "✓ DATABASE_URL is configured" -ForegroundColor Green
        
        # Check if it's still the default localhost
        if ($envContent -match 'mongodb://localhost') {
            Write-Host ""
            Write-Host "⚠ Using local MongoDB (localhost:27017)" -ForegroundColor Yellow
            Write-Host "Make sure MongoDB is installed and running!" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "To use MongoDB Atlas (cloud) instead:" -ForegroundColor Cyan
            Write-Host "1. Follow instructions in QUICK_MONGODB_SETUP.md" -ForegroundColor White
            Write-Host "2. Update DATABASE_URL in backend/.env" -ForegroundColor White
            Write-Host ""
        } else {
            Write-Host "✓ Using MongoDB Atlas (cloud)" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠ DATABASE_URL needs to be configured" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ Backend .env file not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Step 1: MongoDB Setup ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose one option:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option A: MongoDB Atlas (Cloud - Recommended)" -ForegroundColor Green
Write-Host "  - Free tier available" -ForegroundColor White
Write-Host "  - No installation needed" -ForegroundColor White
Write-Host "  - See: QUICK_MONGODB_SETUP.md" -ForegroundColor White
Write-Host ""
Write-Host "Option B: Local MongoDB" -ForegroundColor Yellow
Write-Host "  - Download from: https://www.mongodb.com/try/download/community" -ForegroundColor White
Write-Host "  - Install and start MongoDB service" -ForegroundColor White
Write-Host ""
Write-Host "Press any key after you've configured MongoDB..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "=== Step 2: Generate Prisma Client ===" -ForegroundColor Cyan
Write-Host ""
Set-Location backend
try {
    Write-Host "Generating Prisma client..." -ForegroundColor Yellow
    npx prisma generate
    Write-Host "✓ Prisma client generated successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠ Error generating Prisma client" -ForegroundColor Red
    Write-Host "Make sure MongoDB is running and DATABASE_URL is correct" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Step 3: Push Database Schema ===" -ForegroundColor Cyan
Write-Host ""
try {
    Write-Host "Pushing schema to database..." -ForegroundColor Yellow
    npx prisma db push --accept-data-loss
    Write-Host "✓ Database schema pushed successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠ Error pushing schema" -ForegroundColor Red
    Write-Host "Check your DATABASE_URL connection string" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Red
}

Set-Location ..

Write-Host ""
Write-Host "=== Step 4: Verify Setup ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Testing database connection..." -ForegroundColor Yellow
try {
    Set-Location backend
    node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => { console.log('✓ Database connection successful'); process.exit(0); }).catch((e) => { console.log('✗ Database connection failed:', e.message); process.exit(1); });"
    Write-Host ""
} catch {
    Write-Host "⚠ Could not verify connection" -ForegroundColor Yellow
}
Set-Location ..

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start backend:  cd backend && npm run dev" -ForegroundColor White
Write-Host "2. Start frontend: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
