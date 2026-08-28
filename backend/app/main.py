import warnings
from sklearn.exceptions import InconsistentVersionWarning
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)
from app.routes import vision, unified, export
from fastapi import FastAPI
# ... the rest of your main.py code
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import vision, unified
from app.routes.vision import router as vision_router
from .schemas import FraudRequest
from .predictor import predict_claim

app = FastAPI(
    title="ClaimGuard AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vision_router)
app.include_router(unified.router)
app.include_router(export.router)

@app.get("/")
def home():
    return {
        "message": "ClaimGuard AI Running"
    }


@app.post("/predict")
def predict(request: FraudRequest):

    result = predict_claim(
        list(
            request.model_dump().values()
        )
    )

    return result