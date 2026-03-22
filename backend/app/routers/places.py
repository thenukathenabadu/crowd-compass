from fastapi import APIRouter

router = APIRouter(prefix='/places', tags=['places'])


@router.get('/nearby')
async def get_nearby_places():
    # Implemented in Phase 5
    return []


@router.get('/{place_id}')
async def get_place_detail(place_id: str):
    # Implemented in Phase 6
    return {}
