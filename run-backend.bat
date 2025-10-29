@echo off
echo ====================================
echo Starting Backend Server
echo ====================================

REM Check if venv exists
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup-windows.bat first
    pause
    exit /b 1
)

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Starting FastAPI backend on http://localhost:4001
echo Press Ctrl+C to stop the server
echo.

venv\Scripts\python.exe -m uvicorn backend.image_analyzer.image_analyzer:app --host 0.0.0.0 --port 4001

