from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class InteractionCreate(BaseModel):
    hcp_name: str
    interaction_type: str
    date: Optional[str] = None
    time: Optional[str] = None

    attendees: Optional[list[str]] = None
    topics: Optional[str] = None

    materials: Optional[list[str]] = None
    samples: Optional[list[str]] = None

    sentiment: Optional[str] = None

    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None
    follow_up_suggestions: list[str] = []
    summary: str = ""


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
    follow_up_suggestions: Optional[list[str]] = None
    summary: Optional[str] = None
    follow_up: Optional[str] = None
    

class InteractionResponse(BaseModel):
    id: int

    hcp_name: str
    interaction_type: str

    date: Optional[str] = None
    time: Optional[str] = None

    attendees: Optional[list[str]] = None
    topics: Optional[str] = None

    materials: Optional[list[str]] = None
    samples: Optional[list[str]] = None

    sentiment: Optional[str] = None
    outcomes: Optional[str] = None

    follow_up_actions: Optional[str] = None
    follow_up_suggestions: list[str] = []

    summary: Optional[str] = None

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)