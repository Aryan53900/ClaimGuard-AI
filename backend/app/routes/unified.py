import json
import os
import shutil
import uuid
from datetime import datetime # ADD THIS IMPORT
from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pydantic import ValidationError

from app.schemas import FraudRequest
from app.predictor import predict_claim
from app.vision import analyze_damage

router = APIRouter()
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/unified-report")
async def generate_unified_report(
    claim_data: str = Form(...),
    image: UploadFile = File(...)
):
    # 1. Parse and Validate Structured Claim Data
    try:
        claim_dict = json.loads(claim_data)
        validated_claim = FraudRequest(**claim_dict)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format in claim_data")
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

    # 2. Run XGBoost ML Prediction
    try:
        ml_result = predict_claim(validated_claim.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ML Prediction failed: {str(e)}")

    # 3. Save Image & Run Gemini Vision Analysis
    filename = f"{uuid.uuid4()}_{image.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    try:
        vision_text = analyze_damage(filepath)
        cleaned_vision_text = vision_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        vision_result = json.loads(cleaned_vision_text)
    except Exception as e:
        vision_result = {"error": f"Vision analysis failed: {str(e)}"}
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)

    # 4. Log to Local JSON Database
    db_filepath = "claims_db.json"
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "claim_inputs": claim_dict,
        "ml_result": ml_result,
        "vision_result": vision_result
    }
    
    if os.path.exists(db_filepath):
        with open(db_filepath, "r") as f:
            database = json.load(f)
    else:
        database = []
        
    database.append(log_entry)
    
    with open(db_filepath, "w") as f:
        json.dump(database, f, indent=4)

    # 5. Return Combined AI Assessment
    return {
        "status": "success",
        "fraud_prediction": ml_result,
        "vision_analysis": vision_result
    }