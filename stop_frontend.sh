#!/bin/bash

echo "Stopping frontend (npm)..."

PID=$(ps aux | grep "npm start --prefix frontend" | grep -v grep | awk '{print $2}')

if [ -z "$PID" ]; then
    echo "No frontend process found."
else
    kill "$PID" && echo "Frontend process $PID stopped." || echo "Failed to stop frontend process $PID."
fi
