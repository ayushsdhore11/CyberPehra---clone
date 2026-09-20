from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import pandas as pd


router = APIRouter(
    prefix="/api/hotspots",
    tags=["GIS Hotspots"],
)


model = joblib.load(
    "ml/model/random_forest_model.pkl"
)


LOCATIONS = [
    ("Pune", 18.5204, 73.8567, 0.90),
    ("Mumbai", 19.0760, 72.8777, 0.82),
    ("Nagpur", 21.1458, 79.0882, 0.68),
    ("Nashik", 19.9975, 73.7898, 0.58),
    ("Thane", 19.2183, 72.9781, 0.76),
    ("Kolhapur", 16.7050, 74.2433, 0.45),
    ("Aurangabad", 19.8762, 75.3433, 0.52),
]


class HotspotRequest(BaseModel):
    transaction_amount: float
    transaction_count: int
    complaint_count: int
    location_risk: float
    withdrawal_distance: float
    withdrawal_hour: int
    previous_cases: int


class HotspotLocation(BaseModel):
    location: str
    latitude: float
    longitude: float
    risk_score: float
    risk_level: str
    hotspot: bool


class HotspotResponse(BaseModel):
    locations: list[HotspotLocation]


def get_risk_level(risk_score: float) -> str:

    if risk_score >= 70:
        return "HIGH"

    if risk_score >= 40:
        return "MEDIUM"

    return "LOW"


def calculate_location_risk(
    model_score: float,
    location_risk: float,
) -> float:

    combined_score = (
        (model_score * 0.65)
        + (location_risk * 100 * 0.35)
    )

    return round(
        max(0, min(100, combined_score)),
        2,
    )


@router.post(
    "/predict",
    response_model=HotspotResponse,
)
def predict_hotspots(request: HotspotRequest):

    results = []

    for (
        location_name,
        latitude,
        longitude,
        base_location_risk,
    ) in LOCATIONS:

        data = pd.DataFrame(
            [[
                request.transaction_amount,
                request.transaction_count,
                request.complaint_count,
                latitude,
                longitude,
                base_location_risk,
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

        probability = model.predict_proba(data)[0][1]

        model_score = probability * 100

        risk_score = calculate_location_risk(
            model_score,
            base_location_risk,
        )

        hotspot = risk_score >= 70

        results.append(
            HotspotLocation(
                location=location_name,
                latitude=latitude,
                longitude=longitude,
                risk_score=risk_score,
                risk_level=get_risk_level(
                    risk_score
                ),
                hotspot=hotspot,
            )
        )

    results.sort(
        key=lambda item: item.risk_score,
        reverse=True,
    )

    return {
        "locations": results
    }