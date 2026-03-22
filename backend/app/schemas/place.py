from datetime import datetime
from pydantic import BaseModel


class PlaceResponse(BaseModel):
    place_id: str
    name: str
    lat: float
    lng: float
    category: str | None
    distance_m: float | None = None
    energy_score: float | None = None
    vibe_label: str | None = None
    last_reading_at: datetime | None = None

    model_config = {'from_attributes': True}


class HourlyEntry(BaseModel):
    hour: int
    avg_energy: float


class RecentReading(BaseModel):
    timestamp: datetime
    energy_score: int
    crowd_level: int


class PlaceDetailResponse(PlaceResponse):
    current_energy: float | None = None
    hourly_history: list[HourlyEntry] = []
    weekly_pattern: list[HourlyEntry] = []
    recent_readings: list[RecentReading] = []
    weather: dict | None = None
