from datetime import datetime, timezone
import geohash as gh
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models.heatmap_cell import HeatmapCell


async def upsert_cell(session: AsyncSession, geohash: str, new_score: int) -> None:
    result = await session.execute(select(HeatmapCell).where(HeatmapCell.geohash == geohash))
    cell = result.scalar_one_or_none()

    lat, lng = gh.decode(geohash)

    if cell is None:
        cell = HeatmapCell(
            geohash=geohash,
            lat=lat,
            lng=lng,
            avg_energy=float(new_score),
            reading_count=1,
            last_updated=datetime.now(timezone.utc),
        )
        session.add(cell)
    else:
        new_avg = (cell.avg_energy * cell.reading_count + new_score) / (cell.reading_count + 1)
        cell.avg_energy = new_avg
        cell.reading_count += 1
        cell.last_updated = datetime.now(timezone.utc)

    await session.flush()
