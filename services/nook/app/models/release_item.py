from __future__ import annotations

from sqlalchemy import String, Text, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ReleaseItem(Base):
    __tablename__ = "release_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    release_id: Mapped[int] = mapped_column(ForeignKey("releases.id"), index=True)
    component_id: Mapped[int] = mapped_column(ForeignKey("components.id"), index=True)
    change_type: Mapped[str] = mapped_column(String(10))
    change_note: Mapped[str] = mapped_column(Text)
    release: Mapped["Release"] = relationship(back_populates="items")
    component: Mapped["Component"] = relationship(back_populates="release_items")