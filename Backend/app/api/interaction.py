from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.crud.interaction import (
    create_interaction,
    get_interactions,
    get_interaction,
    update_interaction,
    delete_interaction,
    update_ai_fields,
)

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)
from app.services.groq_service import parse_chat_message
from app.langgraph_agent.workflow import workflow

from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
    InteractionResponse,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)


# @router.post("/", response_model=InteractionResponse)
# def create(
#     interaction: InteractionCreate,
#     db: Session = Depends(get_db),
# ):
#     return create_interaction(db, interaction)



@router.post("/", response_model=InteractionResponse)
def create(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    # Step 1: Save interaction to database
    interaction_db = create_interaction(db, interaction)

    # Step 2: Prepare notes for AI
    notes = f"""
Date: {interaction.date}
Time: {interaction.time}

Attendees:
{interaction.attendees}

Topics:
{interaction.topics}

Materials Shared:
{", ".join(interaction.materials)}

Samples Distributed:
{", ".join(interaction.samples)}

Outcomes:
{interaction.outcomes}

Follow-up Actions:
{interaction.follow_up_actions}
"""

    # Step 3: Run LangGraph workflow
    result = workflow.invoke(
        {
            "hcp_name": interaction.hcp_name,
            "interaction_type": interaction.interaction_type,
            "notes": notes,
        }
    )

    # Step 4: Save AI-generated fields
    interaction_db = update_ai_fields(
        db=db,
        interaction_id=interaction_db.id,
        summary=result["summary"].strip(),
        sentiment=result["sentiment"].strip(),
        follow_up=result["follow_up"].strip(),
    )

    # Step 5: Return updated interaction
    return interaction_db


@router.post(
    "/chat-parse",
    response_model=ChatResponse,
)
def chat_parse(request: ChatRequest):
    try:
        result = parse_chat_message(request.message)
        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    

    

@router.get("/", response_model=list[InteractionResponse])
def read_all(
    db: Session = Depends(get_db),
):
    return get_interactions(db)


@router.get("/{interaction_id}", response_model=InteractionResponse)
def read_one(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    interaction = get_interaction(db, interaction_id)

    if interaction is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return interaction


@router.put("/{interaction_id}", response_model=InteractionResponse)
def update(
    interaction_id: int,
    interaction: InteractionUpdate,
    db: Session = Depends(get_db),
):
    updated = update_interaction(
        db,
        interaction_id,
        interaction,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return updated


@router.delete("/{interaction_id}")
def delete(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_interaction(
        db,
        interaction_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return {
        "message": "Interaction deleted successfully"
    }