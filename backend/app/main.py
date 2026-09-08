from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.complaint import Complaint
from app.routers.complaints import router as complaints_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="CyberPehra API",
    description="AI-Powered Predictive Cybercrime Intelligence System",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(complaints_router)


@app.get("/")
def root():
    return {
        "message": "CyberPehra Backend is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }