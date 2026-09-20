from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime


router = APIRouter(
    prefix="/api/alerts",
    tags=["Alerts"],
)


class AlertRequest(BaseModel):
    location: str
    risk_score: float
    risk_level: str
    hotspot: bool


class AlertResponse(BaseModel):
    alert_id: str
    location: str
    risk_score: float
    risk_level: str
    priority: str
    alert_status: str
    message: str
    recommended_action: str
    created_at: str


@router.post(
    "/generate",
    response_model=AlertResponse,
)
def generate_alert(request: AlertRequest):

    if request.risk_score >= 70:

        priority = "URGENT"
        alert_status = "ACTIVE"

        message = (
            f"High-risk cash withdrawal activity predicted "
            f"around {request.location}."
        )

        recommended_action = (
            "Immediately increase monitoring around the "
            "predicted location and coordinate proactive "
            "cybercrime intervention."
        )

    elif request.risk_score >= 40:

        priority = "HIGH"
        alert_status = "MONITOR"

        message = (
            f"Elevated cybercrime risk detected around "
            f"{request.location}."
        )

        recommended_action = (
            "Increase monitoring and review recent "
            "complaint and transaction activity."
        )

    else:

        priority = "NORMAL"
        alert_status = "MONITOR"

        message = (
            f"Low predicted risk detected around "
            f"{request.location}."
        )

        recommended_action = (
            "Continue routine monitoring and track "
            "new complaint patterns."
        )

    alert_id = (
        f"CP-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )

    return {
        "alert_id": alert_id,
        "location": request.location,
        "risk_score": round(request.risk_score, 2),
        "risk_level": request.risk_level,
        "priority": priority,
        "alert_status": alert_status,
        "message": message,
        "recommended_action": recommended_action,
        "created_at": datetime.now().isoformat(),
    }