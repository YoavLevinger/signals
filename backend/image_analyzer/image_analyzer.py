from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
import requests
from PIL import Image
import base64
from io import BytesIO

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2-vision"

def encode_image(file: UploadFile) -> str:
    image = Image.open(file.file)
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

@app.post("/ask")
async def ask_image_question(image: UploadFile = File(...), question: str = Form(...)):
    try:
        b64_image = encode_image(image)
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": question,
                "images": [b64_image],
                "stream": False
            }
        )
        result = response.json()
        return JSONResponse(content={"response": result.get("response")})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
