from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..database import get_db
from ..models.heatmap_cell import HeatmapCell
from ..schemas.heatmap import HeatmapCellResponse

router = APIRouter(prefix='/heatmap', tags=['heatmap'])


@router.get('', response_model=list[HeatmapCellResponse])
async def get_heatmap(
    min_lat: float,
    max_lat: float,
    min_lng: float,
    max_lng: float,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(HeatmapCell).where(
            HeatmapCell.lat >= min_lat,
            HeatmapCell.lat <= max_lat,
            HeatmapCell.lng >= min_lng,
            HeatmapCell.lng <= max_lng,
        )
    )
    return result.scalars().all()
