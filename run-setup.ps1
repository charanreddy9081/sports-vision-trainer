# Complete Setup Script for Sports Vision Trainer with MongoDB
param(
    [string]$MongoUrl = ""
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sports Vision Trainer" -ForegroundColor Cyan
Write-Host "  Complete MongoDB Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get MongoDB connection string
if ([string]::IsNullOrWhiteSpace($MongoUrl)) {
    Write-Host "MongoDB Connection Setup" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You have two options:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. MongoDB Atlas (Cloud - Recommended)" -ForegroundColor Green
    Write-Host "   - Free tier available" -ForegroundColor White
    Write-Host "   - Follow instructions in COMPLETE_SETUP.md" -ForegroundColor White
    Write-Host "   - Get connection string from Atlas dashboard" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Local MongoDB" -ForegroundColor Yellow
    Write-Host "   - Install from: https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "   - Use: mongodb://localhost:27017/sports_vision_trainer" -ForegroundColor White
    Write-Host ""
    
    $MongoUrl = Read-Host "Enter MongoDB connection string (or press Enter to use localhost)"
    
    if ([string]::IsNullOrWhiteSpace($MongoUrl)) {
        $MongoUrl = "mongodb://localhost:27017/sports_vision_trainer"
        Write-Host "Using local MongoDB: $MongoUrl" -ForegroundColor Green
    }
}

# Step 2: Update .env file
Write-Host ""
Write-Host "Updating backend/.env..." -ForegroundColor Yellow
$envContent = @"
DATABASE_URL="$MongoUrl"
JWT_SECRET="sports-vision-trainer-jwt-secret-key-2024-change-in-production"
JWT_REFRESH_SECRET="sports-vision-trainer-refresh-secret-key-2024-change-in-production"
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"
"@

Set-Content -Path "backend\.env" -Value $envContent
Write-Host "✓ Updated backend/.env" -ForegroundColor Green

# Step 3: Generate Prisma Client
Write-Host ""
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
Set-Location backend
try {
    npx prisma generate 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Prisma Client generated successfully" -ForegroundColor Green
    } else {
        Write-Host "⚠ Prisma generation had issues - continuing anyway" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Error generating Prisma client: $_" -ForegroundColor Yellow
}

# Step 4: Push Schema
Write-Host ""
Write-Host "Pushing database schema..." -ForegroundColor Yellow
try {
    npx prisma db push --accept-data-loss 2>&1 | Tee-Object -Variable output
    if ($output -match "Pushed|Everything is now in sync") {
        Write-Host "✓ Database schema pushed successfully" -ForegroundColor Green
    } else {
        Write-Host "⚠ Could not push schema - check your MongoDB connection" -ForegroundColor Yellow
        Write-Host "Make sure MongoDB is running and connection string is correct" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Error pushing schema: $_" -ForegroundColor Yellow
    Write-Host "This is normal if MongoDB is not connected yet" -ForegroundColor Yellow
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Make sure MongoDB is running/connected" -ForegroundColor White
Write-Host "2. Start backend:  cd backend && npm run dev" -ForegroundColor White
Write-Host "3. Start frontend: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
