from pydantic import BaseModel


class PredictionRequest(BaseModel):

    transaction_amount: float

    transaction_count: int

    complaint_count: int

    latitude: float

    longitude: float

    location_risk: float

    withdrawal_distance: float

    withdrawal_hour: int

    previous_cases: int


class PredictionResponse(BaseModel):

    risk_score: float

    risk_level: str

    hotspot: bool

    latitude: float

    longitude: float

    location: str


class ForecastLocationResponse(BaseModel):

    predicted_location: str

    latitude: float

    longitude: float

    risk_score: float

    risk_level: str

    hotspot: bool