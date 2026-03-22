from datetime import datetime
from pydantic import BaseModel


class HeatmapCellResponse(BaseModel):
    geohash: str
    lat: float
    lng: float
    avg_energy: float
    reading_count: int
    last_updated: datetime

    model_config = {'from_attributes': True}
