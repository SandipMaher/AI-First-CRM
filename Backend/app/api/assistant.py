from fastapi import APIRouter

from app.schemas.assistant import (
    AssistantRequest
)
from app.langgraph_agent.assistant_workflow import run_agent

router = APIRouter(
    prefix="/assistant",
    tags=["AI Assistant"],
)


@router.post("/chat")
def assistant_chat(request: AssistantRequest):
    return run_agent(request.message)