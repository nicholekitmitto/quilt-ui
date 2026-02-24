from __future__ import annotations

from sqlalchemy import String, DateTime, func, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Release(Base):
    __tablename__ = "releases"

    id: Mapped[int] = mapped_column(primary_key=True)
    version: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    notes: Mapped[str] = mapped_column(Text, default="")
    commit_sha: Mapped[str | None] = mapped_column(String(64), nullable=True)
    items: Mapped[list["ReleaseItem"]] = relationship(
        back_populates="release",
        cascade="all, delete-orphan",
    )

    created_at: Mapped[object] = mapped_column(DateTime(timezone=True), server_default=func.now())