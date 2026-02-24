from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ReleaseItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    release_id: int
    component_id: int
    change_type: str
    change_note: str