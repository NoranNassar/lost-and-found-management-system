
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.items import router as items_router


app = FastAPI(
    title="Lost and Found Management System",
    description="Backend API for managing lost and found reports",
    version="1.0.0"
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home Endpoint
@app.get("/")
def home():
    return {
        "message": "Lost and Found Backend is running!"
    }


# Health Check Endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# Register Routers
app.include_router(items_router)
