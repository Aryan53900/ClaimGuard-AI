import joblib
import pandas as pd

from .feature_order import FEATURE_COLUMNS

model = joblib.load(
    "models/fraud_model.pkl"
)

def predict_claim(data):

    df = pd.DataFrame([data])

    df.columns = FEATURE_COLUMNS

    prediction = model.predict(df)[0]

    probability = max(
        model.predict_proba(df)[0]
    )

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }