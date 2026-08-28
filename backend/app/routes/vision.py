import json
import os
import shutil
import uuid
from fastapi import APIRouter, File, UploadFile
from app.vision import analyze_damage

router = APIRouter()
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/analyze-image")
async def analyze_image(image: UploadFile = File(...)):
    filename = f"{uuid.uuid4()}_{image.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    try:
        result = analyze_damage(filepath)
        # Strip markdown fences just in case Gemini includes them
        cleaned_result = result.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        
        return json.loads(cleaned_result)
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)