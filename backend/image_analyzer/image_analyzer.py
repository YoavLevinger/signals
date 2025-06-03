from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from PIL import Image
import base64
from io import BytesIO
import time
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2-vision"
PROMPT_FILE = os.path.join(os.path.dirname(__file__), 'prompt.txt')

def load_prompt():
    with open(PROMPT_FILE, 'r', encoding='utf-8') as f:
        return f.read()

def encode_image(file: UploadFile) -> str:
    image = Image.open(file.file)
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

@app.post("/ask")
async def ask_image_question(image: UploadFile = File(...), question: str = Form(...)):
    try:
        b64_image = encode_image(image)
        prompt_text = load_prompt()
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt_text,
                # question,
                "images": [b64_image],
                "stream": False
            }
        )
        result = response.json()
        return JSONResponse(content={"response": result.get("response")})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
