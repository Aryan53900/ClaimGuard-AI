from fastapi import FastAPI

from .schemas import FraudRequest
from .predictor import predict_claim

app = FastAPI(
    title="ClaimGuard AI"
)

@app.get("/")
def home():
    return {
        "message": "ClaimGuard AI Running"
    }

@app.post("/predict")
def predict(
    request: FraudRequest
):
    result = predict_claim(
        list(
            request.dict().values()
        )
    )

    return result