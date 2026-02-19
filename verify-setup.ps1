# Verify Setup Script - Check if everything is ready for deployment

Write-Host "🔍 Sports Vision Trainer - Setup Verification" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    $errors++
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
    $errors++
}

# Check Git
Write-Host "Checking Git..." -ForegroundColor Cyan
try {
    $gitVersion = git --version
    Write-Host "✅ Git installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Git not found. Install Git for deployment" -ForegroundColor Yellow
    $warnings++
}

# Check backend directory
Write-Host ""
Write-Host "Checking project structure..." -ForegroundColor Cyan
if (Test-Path backend) {
    Write-Host "✅ backend/ directory exists" -ForegroundColor Green
} else {
    Write-Host "❌ backend/ directory not found" -ForegroundColor Red
    $errors++
}

# Check frontend directory
if (Test-Path frontend) {
    Write-Host "✅ frontend/ directory exists" -ForegroundColor Green
} else {
    Write-Host "❌ frontend/ directory not found" -ForegroundColor Red
    $errors++
}

# Check backend package.json
if (Test-Path backend/package.json) {
    Write-Host "✅ backend/package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ backend/package.json not found" -ForegroundColor Red
    $errors++
}

# Check frontend package.json
if (Test-Path frontend/package.json) {
    Write-Host "✅ frontend/package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ frontend/package.json not found" -ForegroundColor Red
    $errors++
}

# Check Prisma schema
if (Test-Path backend/prisma/schema.prisma) {
    Write-Host "✅ Prisma schema exists" -ForegroundColor Green
} else {
    Write-Host "❌ Prisma schema not found" -ForegroundColor Red
    $errors++
}

# Check environment files
Write-Host ""
Write-Host "Checking environment files..." -ForegroundColor Cyan

if (Test-Path backend/.env.example) {
    Write-Host "✅ backend/.env.example exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend/.env.example not found" -ForegroundColor Yellow
    $warnings++
}

if (Test-Path backend/.env) {
    Write-Host "✅ backend/.env exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend/.env not found (needed for local dev)" -ForegroundColor Yellow
    $warnings++
}

if (Test-Path frontend/.env.example) {
    Write-Host "✅ frontend/.env.example exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  frontend/.env.example not found" -ForegroundColor Yellow
    $warnings++
}

if (Test-Path frontend/.env.local) {
    Write-Host "✅ frontend/.env.local exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  frontend/.env.local not found (needed for local dev)" -ForegroundColor Yellow
    $warnings++
}

# Check deployment files
Write-Host ""
Write-Host "Checking deployment files..." -ForegroundColor Cyan

if (Test-Path vercel.json) {
    Write-Host "✅ vercel.json exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  vercel.json not found" -ForegroundColor Yellow
    $warnings++
}

if (Test-Path render.yaml) {
    Write-Host "✅ render.yaml exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  render.yaml not found" -ForegroundColor Yellow
    $warnings++
}

if (Test-Path Dockerfile) {
    Write-Host "✅ Dockerfile exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Dockerfile not found" -ForegroundColor Yellow
    $warnings++
}

# Check documentation
Write-Host ""
Write-Host "Checking documentation..." -ForegroundColor Cyan

$docs = @("README.md", "QUICK_DEPLOY.md", "DEPLOYMENT_GUIDE.md", "DEPLOYMENT_OPTIONS.md")
foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "✅ $doc exists" -ForegroundColor Green
    } else {
        Write-Host "⚠️  $doc not found" -ForegroundColor Yellow
        $warnings++
    }
}

# Summary
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ All checks passed! Ready for deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: ./deploy.ps1"
    Write-Host "2. Follow: QUICK_DEPLOY.md"
} elseif ($errors -eq 0) {
    Write-Host "⚠️  $warnings warning(s) found" -ForegroundColor Yellow
    Write-Host "You can proceed, but review warnings above" -ForegroundColor Yellow
} else {
    Write-Host "❌ $errors error(s) and $warnings warning(s) found" -ForegroundColor Red
    Write-Host "Please fix errors before deploying" -ForegroundColor Red
}

Write-Host ""
