from datetime import datetime
from .time_model import get_time_prior

DB_FLOOR = -90.0
DB_CEILING = -20.0
WEIGHT_NOISE = 0.60
WEIGHT_CROWD = 0.25
WEIGHT_TIME = 0.15


def _clamp(val: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, val))


def normalize_db(noise_db: float) -> float:
    return _clamp((noise_db - DB_FLOOR) / (DB_CEILING - DB_FLOOR) * 100, 0, 100)


def normalize_crowd(crowd_level: int) -> float:
    return (crowd_level - 1) / 4 * 100


def compute_energy_score(noise_db: float, crowd_level: int, dt: datetime | None = None) -> int:
    if dt is None:
        dt = datetime.utcnow()
    noise_norm = normalize_db(noise_db)
    crowd_norm = normalize_crowd(crowd_level)
    time_prior = get_time_prior(dt)
    score = WEIGHT_NOISE * noise_norm + WEIGHT_CROWD * crowd_norm + WEIGHT_TIME * time_prior
    return round(score)
