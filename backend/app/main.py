from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router
from app.routes.intelligence import router as intelligence_router
from app.routes.alerts import router as alerts_router
from app.routes.hotspots import router as hotspots_router


app = FastAPI(
    title="CyberPehra API",
    description="Predictive Cybercrime Intelligence Backend",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(prediction_router)
app.include_router(intelligence_router)
app.include_router(alerts_router)
app.include_router(hotspots_router)


@app.get("/")
def root():

    return {
        "project": "CyberPehra",
        "status": "running",
        "message": "Predictive Cybercrime Intelligence API",
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }