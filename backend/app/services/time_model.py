from datetime import datetime


# Time-of-day energy prior (day_of_week 0=Mon, hour 0-23) → 0-100
# Based on typical urban activity patterns
_PRIOR: dict[tuple[int, int], int] = {}


def _build_prior():
    for dow in range(7):
        is_weekend = dow >= 5  # Sat, Sun
        is_fri_sat = dow in (4, 5)
        for hour in range(24):
            if 0 <= hour < 6:
                val = 20 if is_weekend else 5
            elif 6 <= hour < 9:
                val = 15 if is_weekend else 30
            elif 9 <= hour < 12:
                val = 40 if is_weekend else 50
            elif 12 <= hour < 14:
                val = 65  # lunch
            elif 14 <= hour < 17:
                val = 55 if is_weekend else 45
            elif 17 <= hour < 19:
                val = 70  # rush hour
            elif 19 <= hour < 21:
                val = 75 if is_fri_sat else 55
            elif 21 <= hour < 24:
                val = 80 if is_fri_sat else 40
            else:
                val = 30
            _PRIOR[(dow, hour)] = val


_build_prior()


def get_time_prior(dt: datetime) -> int:
    dow = dt.weekday()  # 0=Mon
    hour = dt.hour
    return _PRIOR.get((dow, hour), 30)
