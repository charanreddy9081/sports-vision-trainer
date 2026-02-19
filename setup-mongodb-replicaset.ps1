# Setup MongoDB as Replica Set (required for Prisma transactions)
# Run this script as Administrator

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Replica Set Setup" -ForegroundColor Cyan
Write-Host "  (Required for Prisma with MongoDB)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find MongoDB config
$configPaths = @(
    "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg",
    "C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg",
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg",
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg"
)

$configPath = $null
foreach ($p in $configPaths) {
    if (Test-Path $p) {
        $configPath = $p
        break
    }
}

if (-not $configPath) {
    Write-Host "MongoDB config not found in standard locations." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Manual setup steps:" -ForegroundColor Cyan
    Write-Host "1. Stop MongoDB service: net stop MongoDB" -ForegroundColor White
    Write-Host "2. Edit your mongod.cfg and add under 'replication':" -ForegroundColor White
    Write-Host "   replication:" -ForegroundColor Gray
    Write-Host "     replSetName: rs0" -ForegroundColor Gray
    Write-Host "3. Start MongoDB: net start MongoDB" -ForegroundColor White
    Write-Host "4. Run: mongosh --eval `"rs.initiate()`"" -ForegroundColor White
    Write-Host "5. Update backend\.env DATABASE_URL to:" -ForegroundColor White
    Write-Host '   mongodb://localhost:27017/sports_vision_trainer?replicaSet=rs0' -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host "Found config: $configPath" -ForegroundColor Green

# Check if replica set already configured
$configContent = Get-Content $configPath -Raw
if ($configContent -match "replSetName") {
    Write-Host "Replica set already configured in config." -ForegroundColor Green
} else {
    Write-Host "Adding replica set configuration..." -ForegroundColor Yellow
    # Add replication config before the last line
    $replicationBlock = @"

replication:
  replSetName: rs0
"@
    Add-Content -Path $configPath -Value $replicationBlock
    Write-Host "Added replication config." -ForegroundColor Green
}

# Restart MongoDB service
Write-Host ""
Write-Host "Restarting MongoDB service..." -ForegroundColor Yellow
try {
    Stop-Service -Name "MongoDB" -Force -ErrorAction Stop
    Start-Sleep -Seconds 3
    Start-Service -Name "MongoDB" -ErrorAction Stop
    Start-Sleep -Seconds 3
    Write-Host "MongoDB restarted." -ForegroundColor Green
} catch {
    Write-Host "Could not restart service. Run as Administrator or restart manually." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Initialize replica set
Write-Host ""
Write-Host "Initializing replica set..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
try {
    $result = mongosh --quiet --eval "rs.initiate()" 2>&1
    Write-Host $result
    Write-Host "Replica set initialized." -ForegroundColor Green
} catch {
    Write-Host "Run manually: mongosh --eval `"rs.initiate()`"" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Updating backend\.env..." -ForegroundColor Yellow
$envPath = Join-Path $PSScriptRoot "backend\.env"
$envContent = Get-Content $envPath -Raw
$envContent = $envContent -replace 'DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer"', 'DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer?replicaSet=rs0"'
$envContent = $envContent -replace 'DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer\?[^"]*"', 'DATABASE_URL="mongodb://localhost:27017/sports_vision_trainer?replicaSet=rs0"'
Set-Content -Path $envPath -Value $envContent -NoNewline
Write-Host "Done." -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Restart your backend: cd backend && npm run dev" -ForegroundColor Cyan
Write-Host ""
