@echo off
echo ====================================
echo Starting Frontend Server
echo ====================================

REM Check if node_modules exists
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install --legacy-peer-deps
    cd ..
)

echo.
echo Starting React frontend on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

cd frontend
call npm start


