from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
)


def create_interaction(
    db: Session,
    interaction: InteractionCreate,
) -> Interaction:

    notes = f"""
    Date: {interaction.date}

    Time: {interaction.time}

    Attendees:
    {", ".join(interaction.attendees or [])}

    Topics:
    {interaction.topics or ""}

    Materials:
    {", ".join(interaction.materials or [])}

    Samples:
    {", ".join(interaction.samples or [])}

    Outcomes:
    {interaction.outcomes or ""}

    Follow-up Actions:
    {interaction.follow_up_actions or ""}
    """.strip()
   
    db_interaction = Interaction(
    hcp_name=interaction.hcp_name,
    interaction_type=interaction.interaction_type,

    date=interaction.date,
    time=interaction.time,

    attendees=interaction.attendees,
    topics=interaction.topics,

    materials=interaction.materials,
    samples=interaction.samples,

    outcomes=interaction.outcomes,
    follow_up_actions=interaction.follow_up_actions,
    notes=notes, 
)

    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)

    return db_interaction



def get_interactions(
    db: Session,
):
    return (
        db.query(Interaction)
        .order_by(Interaction.created_at.desc())
        .all()
    )


def get_interaction(
    db: Session,
    interaction_id: int,
):
    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )


def update_interaction(
    db: Session,
    interaction_id: int,
    interaction: InteractionUpdate,
):
    db_interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not db_interaction:
        return None

    update_data = interaction.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_interaction, key, value)

    db.commit()
    db.refresh(db_interaction)

    return db_interaction


def delete_interaction(
    db: Session,
    interaction_id: int,
):
    db_interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not db_interaction:
        return None

    db.delete(db_interaction)
    db.commit()

    return db_interaction


def update_ai_fields(
    db: Session,
    interaction_id: int,
    summary: str,
    sentiment: str,
    follow_up: str,
):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    interaction.summary = summary
    interaction.sentiment = sentiment
    interaction.follow_up = follow_up

    db.commit()
    db.refresh(interaction)

    return interaction