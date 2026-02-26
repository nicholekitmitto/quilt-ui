from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.component import Component
from app.models.release import Release
from app.models.release_item import ReleaseItem
from app.schemas.release import ReleaseCreateIn, ReleaseOut


router = APIRouter(prefix="/releases", tags=["releases"])


@router.get("", response_model=List[ReleaseOut])
def list_releases(db: Session = Depends(get_db)):
    return db.query(Release).order_by(Release.version.asc()).all()

@router.get("/{version}", response_model=ReleaseOut)
def get_version(version: str, db: Session = Depends(get_db)):
    release_version = db.query(Release).filter(Release.version == version).first()
    if release_version is None:
        raise HTTPException(status_code=404, detail="Release version not found")
    return release_version

@router.post("", response_model=ReleaseOut, status_code=201)
def create_release(payload: ReleaseCreateIn, db: Session = Depends(get_db)):
    existing = db.query(Release).filter(Release.version == payload.version).first()
    if existing is not None:
        raise HTTPException(status_code=409, detail="Release version already exists")

    keys = [i.componentKey for i in payload.items]
    if len(keys) != len(set(keys)):
        raise HTTPException(status_code=400, detail="Duplicate componentKey in items")

    components = {}
    if keys:
        rows = db.query(Component).filter(Component.key.in_(keys)).all()
        components = {c.key: c for c in rows}

        missing = [k for k in keys if k not in components]
        if missing:
            raise HTTPException(
                status_code=400,
                detail="Unknown componentKey(s): %s" % ", ".join(missing),
            )

    try:
        release = Release(
            version=payload.version,
            notes=payload.notes,
            commit_sha=payload.commitSha,
        )
        db.add(release)
        db.flush()

        created_items: List[ReleaseItem] = []
        for item in payload.items:
            ri = ReleaseItem(
                release_id=release.id,
                component_id=components[item.componentKey].id,
                change_type=item.changeType,
                change_note=item.note,
            )
            created_items.append(ri)

        if created_items:
            db.add_all(created_items)

        db.commit()
        db.refresh(release)

    except Exception:
        db.rollback()
        raise

    return release