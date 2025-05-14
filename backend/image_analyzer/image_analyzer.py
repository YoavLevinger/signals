from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from PIL import Image
import base64
from io import BytesIO
import time

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
                "prompt": "Evaluate each of the following indicators below independently: Are the hands missing, cut off, or extremely small? Are the arms disproportionately large or used aggressively? Is the neck missing or is the head detached from the body? Are the legs tightly closed or crossed unnaturally? Is there genitalia depicted or suggested (e.g., emphasis, exposure, or detail)? Is the face sad, crying, or lacking eyes or a mouth? Is the mouth shown sealed, sewn, or missing entirely? Are the ears overly large or exaggerated? Is the house missing doors or windows? Are there elements like dark clouds, excessive rain, or bars on the house/tree? Are trees drawn without roots or very small in size? Are there phallic shapes (e.g., elongated wedges, circles, weapons)? Is there excessive use of red, black, or dark colors? Are there multiple hearts, wedges, or sad emojis/emoticons? Does the drawing show isolation (e.g., child far from family figures or alone)? For each item, respond YES / NO / UNCLEAR",
                # question,
                "images": [b64_image],
                "stream": False
            }
        )
        result = response.json()
        return JSONResponse(content={"response": result.get("response")})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
