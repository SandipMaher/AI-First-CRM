from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class InteractionCreate(BaseModel):
    hcp_name: str
    interaction_type: str
    date: str
    time: str
    attendees: list[str] 
    topics: str
    materials: list[str]
    samples: list[str]
    sentiment: str
    outcomes: str
    follow_up_actions: str


class InteractionUpdate(BaseModel):
    hcp_name: Optional[str] = None
    interaction_type: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    attendees: Optional[str] = None
    topics: Optional[str] = None
    materials: Optional[list[str]] = None
    samples: Optional[list[str]] = None
    sentiment: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None

    summary: Optional[str] = None
    follow_up: Optional[str] = None

class InteractionResponse(BaseModel):
    id: int

    hcp_name: str
    interaction_type: str
    notes: str

    summary: Optional[str] = None
    sentiment: Optional[str] = None
    follow_up: Optional[str] = None

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)