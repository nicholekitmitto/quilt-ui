from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ComponentCreateIn(BaseModel):
    key: str = Field(min_length=1, max_length=50)
    name: str = Field(min_length=1, max_length=120)
    description: str = Field(default="", max_length=500)
    status: str = Field(default="stable", max_length=20)


class ComponentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    key: str
    name: str
    description: str
    status: str
    created_at: datetime
    updated_at: datetime