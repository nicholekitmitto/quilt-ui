from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict

from app.schemas.release_item import ReleaseItemOut


class ReleaseOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    version: str
    notes: str
    commit_sha: str
    items: List[ReleaseItemOut]
    created_at: datetime