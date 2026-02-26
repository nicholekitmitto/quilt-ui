from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.component import Component
from app.models.release import Release
from app.models.release_item import ReleaseItem
from app.schemas.component import ComponentCreateIn, ComponentOut
from app.schemas.component_history import ComponentHistoryItemOut




router = APIRouter(prefix="/components", tags=["components"])


@router.get("", response_model=List[ComponentOut])
def list_components(db: Session = Depends(get_db)):
    return db.query(Component).order_by(Component.name.asc()).all()


@router.post("", response_model=ComponentOut, status_code=201)
def create_component(payload: ComponentCreateIn, db: Session = Depends(get_db)):
    existing = db.query(Component).filter(Component.key == payload.key).first()
    if existing is not None:
        raise HTTPException(status_code=409, detail="Component key already exists")

    component = Component(
        key=payload.key,
        name=payload.name,
        description=payload.description,
        status=payload.status,
    )
    db.add(component)
    db.commit()
    db.refresh(component)
    return component

@router.get("/{key}", response_model=ComponentOut)
def get_component(key: str, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.key == key).first()
    if component is None:
        raise HTTPException(status_code=404, detail="Component not found")
    return component

@router.get("/{key}/history", response_model=List[ComponentHistoryItemOut])
def get_component_history(key: str, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.key == key).first()
    if component is None:
        raise HTTPException(status_code=404, detail="Component not found")
    rows = (
        db.query(ReleaseItem, Release)
        .join(Release, Release.id == ReleaseItem.release_id)
        .filter(ReleaseItem.component_id == component.id)
        .order_by(Release.created_at.desc())
        .all()
    )

    return [
        ComponentHistoryItemOut(
            version=release.version,
            released_at=release.created_at,
            change_type=item.change_type,
            change_note=item.change_note,
        )
        for item, release in rows
    ]