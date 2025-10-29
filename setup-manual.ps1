# Manual setup script for Windows
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Setting up Drawing Analyzer" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Remove old venv
if (Test-Path venv) {
    Write-Host "`nRemoving old virtual environment..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force venv
}

# Create new venv
Write-Host "`nCreating new virtual environment..." -ForegroundColor Green
python -m venv venv

# Activate venv
Write-Host "`nActivating virtual environment..." -ForegroundColor Green
& .\venv\Scripts\Activate.ps1

# Upgrade pip
Write-Host "`nUpgrading pip..." -ForegroundColor Green
python -m pip install --upgrade pip

# Install packages one by one to avoid issues
Write-Host "`nInstalling dependencies..." -ForegroundColor Green
Write-Host "Installing FastAPI..." -ForegroundColor Yellow
pip install fastapi==0.100.0

Write-Host "Installing Uvicorn..." -ForegroundColor Yellow
pip install uvicorn==0.23.2

Write-Host "Installing Starlette..." -ForegroundColor Yellow
pip install starlette==0.27.0

Write-Host "Installing Pydantic..." -ForegroundColor Yellow
pip install pydantic==1.10.13

Write-Host "Installing requests..." -ForegroundColor Yellow
pip install requests==2.31.0

Write-Host "Installing python-multipart..." -ForegroundColor Yellow
pip install python-multipart==0.0.6

Write-Host "Installing Pillow (latest with wheels)..." -ForegroundColor Yellow
pip install pillow --upgrade

Write-Host "`n====================================" -ForegroundColor Cyan
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Make sure Ollama is installed and running"
Write-Host "2. Run: run-backend.bat"
Write-Host "3. Run: run-frontend.bat"
Write-Host ""






