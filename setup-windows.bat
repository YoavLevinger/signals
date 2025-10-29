@echo off
echo ====================================
echo Setting up Drawing Analyzer (Windows)
echo ====================================

echo.
echo Step 1: Removing old virtual environment if it exists...
if exist "venv" (
    echo Deleting old venv folder...
    rmdir /s /q venv
    if %errorlevel% neq 0 (
        echo ERROR: Could not delete old venv folder
        echo Please close any programs using the venv and try again
        echo Or manually delete the venv folder and run this script again
        pause
        exit /b 1
    )
)

echo.
echo Step 2: Creating new virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    echo Make sure Python is installed and in your PATH
    pause
    exit /b 1
)

echo.
echo Step 3: Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Step 4: Upgrading pip...
python -m pip install --upgrade pip

echo.
echo Step 5: Installing dependencies...
pip install --only-binary=:all: -r backend\requirements.txt
if %errorlevel% neq 0 (
    echo.
    echo Attempting without --only-binary flag...
    pip install -r backend\requirements.txt
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ====================================
echo Setup completed successfully!
echo ====================================
echo.
echo Next steps:
echo 1. Make sure Ollama is installed and running
echo 2. Run: run-backend.bat to start the backend
echo 3. Run: run-frontend.bat to start the frontend
echo.
pause

