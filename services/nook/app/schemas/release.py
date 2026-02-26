import re
from datetime import datetime
from typing import List, Literal
from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.schemas.release_item import ReleaseItemOut

ChangeType = Literal["major", "minor", "patch"]

class ReleaseItemIn(BaseModel):
    componentKey: str = Field(min_length=1)
    changeType: ChangeType
    note: str = Field(min_length=1, max_length=2000)

class ReleaseCreateIn(BaseModel):
    version: str = Field(min_length=1, max_length=50)
    notes: str = Field(default="", max_length=10000)
    commitSha: str | None = Field(default=None, max_length=64)
    items: List[ReleaseItemIn] = Field(min_length=1)

    @field_validator("version")
    @classmethod
    def validate_semver(cls, v: str) -> str:
        if not re.match(r"^\d+\.\d+\.\d+$", v):
            raise ValueError("version must be in x.y.z format")
        return v

class ReleaseOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    version: str
    notes: str
    commit_sha: str | None
    items: List[ReleaseItemOut]
    created_at: datetime