from fastapi import APIRouter
import joblib
import pandas as pd

from app.schemas import PredictionRequest, PredictionResponse


router = APIRouter(
    prefix="/api/prediction",
    tags=["Prediction"],
)


model = joblib.load("ml/model/random_forest_model.pkl")


@router.get("/test")
def prediction_test():
    return {
        "status": "success",
        "message": "Prediction route is working",
    }


@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):

    data = pd.DataFrame(
        [[
            request.transaction_amount,
            request.transaction_count,
            request.complaint_count,
            request.location_risk,
            request.withdrawal_distance,
            request.withdrawal_hour,
            request.previous_cases,
        ]],
        columns=[
            "transaction_amount",
            "transaction_count",
            "complaint_count",
            "location_risk",
            "withdrawal_distance",
            "withdrawal_hour",
            "previous_cases",
        ],
    )

    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    risk_score = round(probability * 100, 2)

    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "hotspot": bool(prediction),
    }