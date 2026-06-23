from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/")
def home():
    return {
        "message": "ClaimGuard AI Running"
    }

@app.post("/predict")
def predict(request: FraudRequest):
    result = predict_claim(
        list(request.dict().values())
    )

    return result