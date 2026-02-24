from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.release import Release
from app.schemas.release import ReleaseOut


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