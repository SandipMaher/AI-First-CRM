from fastapi import APIRouter
from groq import RateLimitError
from fastapi import HTTPException

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
    try:
        return run_agent(
            message=request.message,
            current_form=request.current_form,
        )

    except RateLimitError:
        raise HTTPException(
            status_code=429,
            detail="Groq API rate limit reached. Please try again in a few minutes."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )