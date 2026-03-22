import geohash as gh
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from geoalchemy2.functions import ST_DWithin, ST_SetSRID, ST_MakePoint
from ..database import get_db
from ..models.reading import Reading
from ..schemas.reading import ReadingCreate, ReadingResponse
from ..services.energy import compute_energy_score
from ..services.heatmap_updater import upsert_cell
from ..constants import GEOHASH_PRECISION

router = APIRouter(prefix='/readings', tags=['readings'])


@router.post('', response_model=ReadingResponse)
async def create_reading(body: ReadingCreate, db: AsyncSession = Depends(get_db)):
    now = datetime.now(timezone.utc)
    score = compute_energy_score(body.noise_db, body.crowd_level, now)
    cell_hash = gh.encode(body.lat, body.lng, precision=GEOHASH_PRECISION)

    reading = Reading(
        lat=body.lat,
        lng=body.lng,
        noise_db=body.noise_db,
        crowd_level=body.crowd_level,
        energy_score=score,
        geohash=cell_hash,
        session_id=body.session_id,
        timestamp=now,
    )
    db.add(reading)
    await upsert_cell(db, cell_hash, score)
    await db.commit()
    await db.refresh(reading)
    return reading


@router.get('/nearby', response_model=list[ReadingResponse])
async def get_nearby(
    lat: float,
    lng: float,
    radius_m: float = 500,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    point = ST_SetSRID(ST_MakePoint(lng, lat), 4326)
    result = await db.execute(
        select(Reading)
        .where(ST_DWithin(Reading.geom, point, radius_m / 111_320))
        .order_by(Reading.timestamp.desc())
        .limit(limit)
    )
    return result.scalars().all()
