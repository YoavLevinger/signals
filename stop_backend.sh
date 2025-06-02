#!/bin/bash

echo "Stopping backend (uvicorn)..."

PID=$(ps aux | grep "uvicorn backend.image_analyzer.image_analyzer:app" | grep -v grep | awk '{print $2}')

if [ -z "$PID" ]; then
    echo "No backend process found."
else
    kill "$PID" && echo "Backend process $PID stopped." || echo "Failed to stop backend process $PID."
fi
