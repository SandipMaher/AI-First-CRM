from pydantic import BaseModel


class AssistantRequest(BaseModel):
    message: str
    current_form: dict = {}
