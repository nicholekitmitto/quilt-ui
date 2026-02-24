from datetime import datetime
from pydantic import BaseModel


class ComponentHistoryItemOut(BaseModel):
    version: str
    released_at: datetime
    change_type: str
    change_note: str