from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(255), nullable=False)
    interaction_type = Column(String(100), nullable=False)

    notes = Column(Text, nullable=False)

    # AI generated fields (initially empty)
    summary = Column(Text, nullable=True)
    sentiment = Column(String(50), nullable=True)
    follow_up = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )