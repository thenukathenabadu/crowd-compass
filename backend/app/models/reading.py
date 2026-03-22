import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, SmallInteger, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from geoalchemy2 import Geometry
from ..database import Base


class Reading(Base):
    __tablename__ = 'readings'

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)
    geom: Mapped[object] = mapped_column(Geometry('POINT', srid=4326), nullable=True)
    noise_db: Mapped[float] = mapped_column(Float, nullable=False)
    crowd_level: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    energy_score: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    geohash: Mapped[str] = mapped_column(String(9), nullable=False)
    session_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )
