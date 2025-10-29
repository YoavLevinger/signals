# Quick Start Guide - Signals Drawing Analyzer

## 🚀 Quick Setup (Windows)

### Prerequisites
- Python 3.12 installed
- Node.js 18+ installed
- Ollama installed and running

### Installation Steps

1. **Setup the backend:**
   ```powershell
   .\setup-windows.bat
   ```

2. **Start the backend server:**
   ```powershell
   .\run-backend.bat
   ```

3. **Start the frontend (in a new terminal):**
   ```powershell
   .\run-frontend.bat
   ```

4. **Stop all servers when done:**
   ```powershell
   .\stop-servers.bat
   ```

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4001
- **Health Check:** http://localhost:4001/health

## ✅ Troubleshooting

### Backend Issues
- If port 4001 is already in use, run `.\stop-servers.bat` first
- Make sure Ollama is running: `ollama list`

### Frontend Issues
- If `npm install` fails, use `npm install --legacy-peer-deps`
- Clear cache: `rm -rf node_modules package-lock.json` then reinstall

### Stopping Servers
- Use `.\stop-servers.bat` to kill all Python and Node processes
- Or press `Ctrl+C` in each terminal window

## 📝 Notes

- Backend runs on port 4001
- Frontend runs on port 3000
- Ollama should be running on port 11434
- The venv is in `venv\` directory
- All batch files are in the project root

---

**Last Updated:** October 27, 2025





