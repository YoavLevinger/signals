@echo off
echo ====================================
echo Stopping Backend and Frontend Servers
echo ====================================

REM Kill uvicorn/FastAPI backend processes
echo.
echo Stopping backend server...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *uvicorn*" 2>nul
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *fastapi*" 2>nul
for /f "tokens=2" %%a in ('netstat -aon ^| findstr :4001 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul

REM Kill Node/React frontend processes
echo.
echo Stopping frontend server...
taskkill /F /IM node.exe 2>nul
for /f "tokens=2" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul

echo.
echo ====================================
echo Servers stopped successfully!
echo ====================================
echo.
echo Note: Ollama service continues running
echo.
pause





