from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ComponentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    key: str
    name: str
    description: str
    status: str
    created_at: datetime
    updated_at: datetime