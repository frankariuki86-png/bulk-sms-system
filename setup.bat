@echo off
REM Quick setup script for Bulk SMS System (Windows)
REM Run: setup.bat

echo.
echo 🚀 Bulk SMS System - Setup Script
echo ==================================
echo.

REM Check Node.js
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js 18+
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Setup environment files
echo.
echo Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file
    echo ⚠️  Please update .env with your credentials
) else (
    echo ✓ .env already exists
)

REM Setup frontend
echo.
echo Setting up frontend...
cd frontend
if not exist node_modules (
    echo Installing dependencies...
    call npm install --legacy-peer-deps
    echo ✓ Frontend dependencies installed
) else (
    echo ✓ Frontend dependencies already installed
)
cd ..

REM Setup worker
echo.
echo Setting up worker...
cd worker
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo ✓ Worker dependencies installed
) else (
    echo ✓ Worker dependencies already installed
)
cd ..

REM Setup complete
echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo 1. Update environment variables in .env
echo 2. Set up Supabase database:
echo    npm install -g supabase
echo    supabase link --project-ref ^<your-project-ref^>
echo    supabase db push
echo 3. Start frontend: cd frontend ^& npm run dev
echo 4. Start worker: cd worker ^& npm run dev
