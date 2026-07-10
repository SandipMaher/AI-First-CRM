from app.core.database import Base, engine

# Import all models
from app.models.interaction import Interaction

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")