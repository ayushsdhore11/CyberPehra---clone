from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


TEST_DATA = {
    "transaction_amount": 85000,
    "transaction_count": 12,
    "complaint_count": 15,
    "latitude": 18.5204,
    "longitude": 73.8567,
    "location_risk": 0.9,
    "withdrawal_distance": 2.5,
    "withdrawal_hour": 2,
    "previous_cases": 10,
}


def test_prediction_flow():

    response = client.post(
        "/api/prediction/predict",
        json=TEST_DATA,
    )

    assert response.status_code == 200

    data = response.json()

    assert "risk_score" in data
    assert "risk_level" in data
    assert "hotspot" in data
    assert "latitude" in data
    assert "longitude" in data
    assert "location" in data

    assert 0 <= data["risk_score"] <= 100


def test_forecast_location_flow():

    response = client.post(
        "/api/prediction/forecast-location",
        json=TEST_DATA,
    )

    assert response.status_code == 200

    data = response.json()

    assert "predicted_location" in data
    assert "latitude" in data
    assert "longitude" in data
    assert "risk_score" in data
    assert "risk_level" in data
    assert "hotspot" in data

    assert data["predicted_location"] in [
        "Pune",
        "Mumbai",
        "Nagpur",
        "Nashik",
        "Thane",
        "Kolhapur",
        "Aurangabad",
    ]

    assert 0 <= data["risk_score"] <= 100


def test_intelligence_flow():

    response = client.post(
        "/api/intelligence/generate",
        json={
            "location": "Pune",
            "risk_score": 92.5,
            "risk_level": "HIGH",
            "hotspot": True,
            "transaction_amount": 85000,
            "complaint_count": 15,
            "withdrawal_hour": 2,
            "previous_cases": 10,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["location"] == "Pune"
    assert data["risk_score"] == 92.5
    assert data["risk_level"] == "HIGH"
    assert data["priority"] == "URGENT"
    assert data["hotspot"] is True
    assert data["recommended_action"] is not None
    assert data["intelligence"] is not None


def test_alert_flow():

    response = client.post(
        "/api/alerts/generate",
        json={
            "location": "Pune",
            "risk_score": 92.5,
            "risk_level": "HIGH",
            "hotspot": True,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["location"] == "Pune"
    assert data["risk_score"] == 92.5
    assert data["risk_level"] == "HIGH"
    assert data["priority"] == "URGENT"
    assert data["alert_status"] == "ACTIVE"
    assert data["alert_id"] is not None
    assert data["message"] is not None
    assert data["recommended_action"] is not None
    assert data["created_at"] is not None