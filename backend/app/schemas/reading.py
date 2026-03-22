from datetime import datetime
from pydantic import BaseModel, Field


class ReadingCreate(BaseModel):
    lat: float
    lng: float
    noise_db: float = Field(..., ge=-90, le=0)
    crowd_level: int = Field(..., ge=1, le=5)
    session_id: str | None = None


class ReadingResponse(BaseModel):
    id: str
    lat: float
    lng: float
    noise_db: float
    crowd_level: int
    energy_score: int
    geohash: str
    timestamp: datetime

    model_config = {'from_attributes': True}
