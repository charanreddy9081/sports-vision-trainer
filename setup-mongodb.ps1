# MongoDB Setup Script for Sports Vision Trainer
Write-Host "=== MongoDB Setup for Sports Vision Trainer ===" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is installed locally
Write-Host "Checking for local MongoDB installation..." -ForegroundColor Yellow
$mongodbInstalled = Get-Command mongod -ErrorAction SilentlyContinue

if ($mongodbInstalled) {
    Write-Host "✓ MongoDB is installed locally" -ForegroundColor Green
    Write-Host "Starting MongoDB setup with local database..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Using connection string: mongodb://localhost:27017/sports_vision_trainer" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if MongoDB service is running
    $mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
    if ($mongoService -and $mongoService.Status -eq 'Running') {
        Write-Host "✓ MongoDB service is running" -ForegroundColor Green
    } else {
        Write-Host "⚠ MongoDB service not found or not running" -ForegroundColor Yellow
        Write-Host "Please start MongoDB manually or use MongoDB Atlas (cloud)" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ MongoDB is not installed locally" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "RECOMMENDED: Use MongoDB Atlas (Free Cloud Database)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Steps to set up MongoDB Atlas:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.mongodb.com/cloud/atlas" -ForegroundColor White
    Write-Host "2. Sign up for free account" -ForegroundColor White
    Write-Host "3. Create a free cluster" -ForegroundColor White
    Write-Host "4. Create database user (Database Access)" -ForegroundColor White
    Write-Host "5. Add IP address 0.0.0.0/0 (Network Access)" -ForegroundColor White
    Write-Host "6. Get connection string (Connect -> Connect your application)" -ForegroundColor White
    Write-Host "7. Update backend/.env with your connection string" -ForegroundColor White
    Write-Host ""
}

Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Make sure MongoDB is running (local) or Atlas is configured" -ForegroundColor Yellow
Write-Host "2. Update backend/.env with your DATABASE_URL" -ForegroundColor Yellow
Write-Host "3. Run: cd backend && npx prisma generate" -ForegroundColor Yellow
Write-Host "4. Run: cd backend && npx prisma db push" -ForegroundColor Yellow
Write-Host "5. Start backend: cd backend && npm run dev" -ForegroundColor Yellow
Write-Host "6. Start frontend: cd frontend && npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "For detailed instructions, see MONGODB_SETUP.md" -ForegroundColor Cyan
