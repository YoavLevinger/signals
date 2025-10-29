# Complete installation script for Windows with Python 3.11

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Installing remaining packages..." -ForegroundColor Cyan  
Write-Host "====================================" -ForegroundColor Cyan

# Install FastAPI and related packages
Write-Host "`nInstalling FastAPI..." -ForegroundColor Yellow
pip install fastapi

Write-Host "`nInstalling Uvicorn..." -ForegroundColor Yellow  
pip install uvicorn[standard]

Write-Host "`nInstalling Starlette..." -ForegroundColor Yellow
pip install starlette

Write-Host "`nInstalling Requests..." -ForegroundColor Yellow
pip install requests

Write-Host "`nVerifying installation..." -ForegroundColor Green
python -c "import fastapi; import uvicorn; import PIL; import requests; print('All packages installed successfully!')"

Write-Host "`n====================================" -ForegroundColor Green
Write-Host "Installation completed!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now run: .\run-backend.bat" -ForegroundColor Cyan

