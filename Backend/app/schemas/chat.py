from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    hcp_name: Optional[str] = None
    interaction_type: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    attendees: List[str] = []
    topics: Optional[str] = None
    materials: Optional[str] = None
    sentiment: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up: Optional[str] = None