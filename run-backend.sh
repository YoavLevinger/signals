# uvicorn backend.image_analyzer.image_analyzer:app --host 0.0.0.0 --port 4001
# nohup venv/bin/uvicorn backend.image_analyzer.image_analyzer:app --host 0.0.0.0 --port 4001 > ~/backend.log 2>&1 &
nohup venv/bin/uvicorn backend.image_analyzer.image_analyzer:app --port 4001 > ~/backend.log 2>&1 &
