from fastapi import APIRouter
import joblib
import pandas as pd

from app.schemas import (
    PredictionRequest,
    PredictionResponse,
    ForecastLocationResponse,
)


router = APIRouter(
    prefix="/api/prediction",
    tags=["Prediction"],
)


model = joblib.load("ml/model/random_forest_model.pkl")


LOCATIONS = [
    ("Pune", 18.5204, 73.8567),
    ("Mumbai", 19.0760, 72.8777),
    ("Nagpur", 21.1458, 79.0882),
    ("Nashik", 19.9975, 73.7898),
    ("Thane", 19.2183, 72.9781),
    ("Kolhapur", 16.7050, 74.2433),
    ("Aurangabad", 19.8762, 75.3433),
]


def get_location(latitude: float, longitude: float) -> str:

    nearest_location = min(
        LOCATIONS,
        key=lambda location: (
            (latitude - location[1]) ** 2
            + (longitude - location[2]) ** 2
        ),
    )

    return nearest_location[0]


def get_risk_level(risk_score: float) -> str:

    if risk_score >= 70:
        return "HIGH"

    if risk_score >= 40:
        return "MEDIUM"

    return "LOW"


@router.get("/test")
def prediction_test():

    return {
        "status": "success",
        "message": "Prediction route is working",
    }


@router.post(
    "/predict",
    response_model=PredictionResponse,
)
def predict(request: PredictionRequest):

    data = pd.DataFrame(
        [[
            request.transaction_amount,
            request.transaction_count,
            request.complaint_count,
            request.latitude,
            request.longitude,
            request.location_risk,
            request.withdrawal_distance,
            request.withdrawal_hour,
            request.previous_cases,
        ]],
        columns=[
            "transaction_amount",
            "transaction_count",
            "complaint_count",
            "latitude",
            "longitude",
            "location_risk",
            "withdrawal_distance",
            "withdrawal_hour",
            "previous_cases",
        ],
    )

    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)[0][1]

    risk_score = round(probability * 100, 2)

    risk_level = get_risk_level(risk_score)

    location = get_location(
        request.latitude,
        request.longitude,
    )

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "hotspot": bool(prediction),
        "latitude": request.latitude,
        "longitude": request.longitude,
        "location": location,
    }


@router.post(
    "/forecast-location",
    response_model=ForecastLocationResponse,
)
def forecast_location(request: PredictionRequest):

    candidates = []

    for location_name, latitude, longitude in LOCATIONS:

        data = pd.DataFrame(
            [[
                request.transaction_amount,
                request.transaction_count,
                request.complaint_count,
                latitude,
                longitude,
                request.location_risk,
                request.withdrawal_distance,
                request.withdrawal_hour,
                request.previous_cases,
            ]],
            columns=[
                "transaction_amount",
                "transaction_count",
                "complaint_count",
                "latitude",
                "longitude",
                "location_risk",
                "withdrawal_distance",
                "withdrawal_hour",
                "previous_cases",
            ],
        )

        prediction = model.predict(data)[0]

        probability = model.predict_proba(data)[0][1]

        risk_score = round(probability * 100, 2)

        candidates.append(
            {
                "location": location_name,
                "latitude": latitude,
                "longitude": longitude,
                "risk_score": risk_score,
                "hotspot": bool(prediction),
            }
        )

    predicted = max(
        candidates,
        key=lambda item: item["risk_score"],
    )

    risk_level = get_risk_level(
        predicted["risk_score"]
    )

    return {
        "predicted_location": predicted["location"],
        "latitude": predicted["latitude"],
        "longitude": predicted["longitude"],
        "risk_score": predicted["risk_score"],
        "risk_level": risk_level,
        "hotspot": predicted["hotspot"],
    }