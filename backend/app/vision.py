from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def analyze_damage(image_path: str):
    image = Image.open(image_path)
    
    prompt = """
    You are an insurance claim damage assessment AI.
    Analyze this vehicle damage image.
    Return ONLY valid JSON.
    Schema:
    {
      "damage_severity":"",
      "damaged_parts":[],
      "estimated_repair_cost":"",
      "fraud_indicators":[],
      "summary":""
    }
    Rules:
    - damage_severity must be one of: Minor, Moderate, Severe, Total Loss
    - Estimate repair cost in Indian Rupees.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image],
        config=types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json"
        )
    )

    return response.text