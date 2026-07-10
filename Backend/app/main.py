from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.interaction import router as interaction_router
from app.api.assistant import router as assistant_router

from app.core.database import Base, engine

from app.models.interaction import Interaction

app = FastAPI(
    title="AI First CRM API",
    version="1.0.0",
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)
app.include_router(assistant_router)


@app.get("/")
def root():
    return {
        "message": "AI First CRM Backend Running 🚀"
    }