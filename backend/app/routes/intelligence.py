from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/intelligence",
    tags=["Actionable Intelligence"],
)


class IntelligenceRequest(BaseModel):
    location: str
    risk_score: float
    risk_level: str
    hotspot: bool
    transaction_amount: float
    complaint_count: int
    withdrawal_hour: int
    previous_cases: int


class IntelligenceResponse(BaseModel):
    location: str
    risk_score: float
    risk_level: str
    priority: str
    hotspot: bool
    recommended_action: str
    intelligence: str


@router.post(
    "/generate",
    response_model=IntelligenceResponse,
)
def generate_intelligence(
    request: IntelligenceRequest,
):

    if request.risk_score >= 70:

        priority = "URGENT"

        recommended_action = (
            "Increase monitoring around the predicted "
            "withdrawal location and coordinate timely "
            "preventive intervention."
        )

        intelligence = (
            f"High-risk cybercrime activity is predicted "
            f"around {request.location}. "
            f"The predicted risk score is "
            f"{request.risk_score:.2f}%. "
            f"The location is classified as a potential "
            f"cash withdrawal hotspot. "
            f"Immediate monitoring and proactive coordination "
            f"are recommended."
        )

    elif request.risk_score >= 40:

        priority = "HIGH"

        recommended_action = (
            "Increase monitoring and review recent "
            "complaints and transaction activity "
            "around the predicted location."
        )

        intelligence = (
            f"Moderate-risk cybercrime activity is predicted "
            f"around {request.location}. "
            f"The predicted risk score is "
            f"{request.risk_score:.2f}%. "
            f"Additional monitoring is recommended to "
            f"identify possible emerging withdrawal activity."
        )

    else:

        priority = "NORMAL"

        recommended_action = (
            "Continue routine monitoring and track "
            "new complaint and transaction patterns."
        )

        intelligence = (
            f"Current indicators for {request.location} "
            f"show a lower predicted risk of "
            f"{request.risk_score:.2f}%. "
            f"Routine monitoring should continue."
        )

    return {
        "location": request.location,
        "risk_score": round(request.risk_score, 2),
        "risk_level": request.risk_level,
        "priority": priority,
        "hotspot": request.hotspot,
        "recommended_action": recommended_action,
        "intelligence": intelligence,
    }