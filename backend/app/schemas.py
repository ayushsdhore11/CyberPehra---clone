from pydantic import BaseModel


class PredictionRequest(BaseModel):
    transaction_amount: float
    transaction_count: int
    complaint_count: int
    location_risk: float
    withdrawal_distance: float
    withdrawal_hour: int
    previous_cases: int


class PredictionResponse(BaseModel):
    risk_score: float
    risk_level: str
    hotspot: bool